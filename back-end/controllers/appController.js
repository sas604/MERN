const OAuthClient = require('intuit-oauth');
require('dotenv').config();
const querystring = require('querystring');
const mongoose = require('mongoose');
const crypto = require('crypto');
const Customer = require('../models/Customer');
const WorkOrder = require('../models/WorkOrder');
const { send } = require('../mail/mail');
const servicesName = require('../utils/services');

// TODO make dynamic
const companyID = process.env.COMPANYID;
const oauthClient = new OAuthClient({
  clientId: process.env.QUICKBOOKS_USER_NAME,
  clientSecret: process.env.QUICKBOOKS_USER_SECRET,
  environment: process.env.NODE_ENV,
  redirectUri: process.env.DOMAIN || 'http://localhost:5000/api/callback',
});

let notification = [];

exports.user = (req, res) => {
  console.log(req.session.user);
  if (!req.session.user) {
    res.status(403).json(null);
    return;
  }
  if (req.session.user?.realmId !== companyID) {
    res.status(403).json(null);
    return;
  }
  res.json('user');
};

exports.login = (req, res) => {
  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
    state: 'intuit-test',
  });

  res.json(authUri);
};

exports.callback = async (req, res) => {
  try {
    const token = await oauthClient.createToken(req.url);
    req.session.user = {
      accesToken: token.json.access_token,
      refreshToken: token.json.refresh_token,
      realmId: token.token.realmId,
    };
  } catch (error) {
    console.error(error);
  }
  res.redirect(process.env.DOMAIN ? '/' : 'http://localhost:3000/');
};

exports.checkCredentials = async (req, res, next) => {
  // check the is token exist

  if (!oauthClient.isAccessTokenValid(req.session?.user.accesToken)) {
    // if token is invalid try to refresh it if success procide
    try {
      await oauthClient.refreshUsingToken(req.session.user.refreshToken);
      req.session.user = {
        accesToken: oauthClient.token.access_token,
        refreshToken: oauthClient.token.refresh_token,
      };
      next();
    } catch (error) {
      console.log('reffresh error');
      res.status(403).redirect('/login'); // if no user acces denied function returns you need to log in again.
    }
  } else {
    // the token is valid you can make an API call
    console.log('token is valid');
    next();
  }

  // else try to avtorize it again
};
// TODO make it to hadle more than 1000 cx
exports.getUsers = async (req, res) => {
  const query = querystring.escape('select * from Customer');

  try {
    console.log('try to call');
    const response = await oauthClient.makeApiCall({
      url: `${process.env.QUICKBOOKSURL}${companyID}/query?query=${query}&minorversion=57`,
    });
    const cx = response.json.QueryResponse.Customer;
    const storesArray = [...cx];
    const users = await Customer.insertMany(storesArray);
    res.status(200).json({ msg: 'success' });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
exports.search = async (req, res) => {
  const regex = new RegExp(escapeRegex(req.body.query), 'gi');
  try {
    const Customers = await Customer.find({
      $text: { $search: req.body.query },
    }).limit(10);
    res.json(Customers);
  } catch (e) {
    res.status(505).json(e);
  }
};

exports.createCustomer = async (req, res) => {
  try {
    // make POST to intuit to save CX
    const response = await oauthClient.makeApiCall({
      url: `${process.env.QUICKBOOKSURL}${companyID}/customer?minorversion=57`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });
    console.log(response);
    const cx = JSON.parse(response.body);
    const newCX = await new Customer(cx.Customer).save();
    console.log(newCX); // store new CX in the DB
    // send customer Dispaly name and redirect to Customer page
    res.status(200).json('Succesfuly created customer ');
  } catch (e) {
    res.status(400).json(e);
  }
};

// get single customer from DB
exports.getCx = async (req, res) => {
  try {
    // get cx
    const cx = await Customer.findOne({ DisplayName: req.params.name });

    // get jobs for client doing this way so I dont have to deal with one big object
    const workOrders = await WorkOrder.find({ customer: cx._id }).populate(
      'customer'
    );

    res.json({ cx, workOrders });
  } catch (e) {
    res.status(400).json(e);
  }
};
exports.updateCx = async (req, res) => {
  const data = req.body;
  const id = data._id;
  delete data._id;
  delete data.__v;
  data.sparse = true;
  try {
    const response = await oauthClient.makeApiCall({
      url: `${process.env.QUICKBOOKSURL}${companyID}/customer?minorversion=57`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const cx = JSON.parse(response.body);
    console.log(cx);
    const newCx = await Customer.findOneAndUpdate(
      { Id: cx.Customer.Id },
      cx.Customer
    );
    console.log(newCx);
    res.status(200).json({ name: encodeURIComponent(cx.Customer.DisplayName) });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};
exports.createWorkOrder = async (req, res) => {
  try {
    const order = await new WorkOrder(req.body).save();
    res.status(200).json(`Successfully created work order #${order.invoice}`);
  } catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
};

// Delete Work order
exports.deleteOrder = async (req, res) => {
  try {
    const boop = await WorkOrder.deleteOne({ _id: req.params.invoice });
    console.log(boop);
    res.status(200).json('The order has been deleted');
  } catch (e) {
    res.status(400).json(e);
  }
};

exports.getWorkOrders = async (req, res) => {
  // TODO make this functional
  try {
    // TODO check if i can send only name
    const sortByStatus = await WorkOrder.aggregate([
      {
        $lookup: {
          from: 'customers',
          localField: 'customer',
          foreignField: '_id',
          as: 'customer',
        },
      },
      {
        $set: {
          customer: { $arrayElemAt: ['$customer', 0] },
        },
      },
      {
        $group: {
          _id: '$status',
          docs: { $addToSet: '$$ROOT' },
        },
      },
    ]);
    // TODO send Data in adiferent way
    res.json(sortByStatus);
  } catch (e) {
    console.error(e);
    res.json(e);
  }
};

exports.getWorkOrder = async (req, res) => {
  try {
    const order = await WorkOrder.findById(req.params.orderId).exec();
    res.json(order);
  } catch (e) {
    res.status(400).json(e);
  }
};
exports.updateWorkOrder = async (req, res) => {
  try {
    const order = await WorkOrder.findByIdAndUpdate(req.body._id, req.body);
    res.status(200).json('The order has been updated');
  } catch (e) {
    res.status(400).json(e);
  }
};

exports.shippingWithEmail = async (req, res) => {
  try {
    const order = await WorkOrder.findOne({ _id: req.body._id }).populate(
      'customer'
    );
    order.status = 'shipped';
    order.tracking = req.body.tracking;
    order.save();
    if (!order.customer.PrimaryEmailAddr.Address || !req.body.tracking) {
      res.status(200).json('Update without email confirmation');
      return;
    }
    const options = {
      name: order.customer.GivenName || order.customer.DisplayName,
      address: order.customer.PrimaryEmailAddr.Address,
      number: order.invoice,
      tracking: req.body.tracking,
      service: 'shipped',
    };
    send('shipping', options);

    res.status(200).json('Success');
  } catch (e) {
    console.log(e);
    res.status(400).json('Something went wrong ');
  }
};

exports.updateStatusWithMail = async (req, res) => {
  try {
    const order = await WorkOrder.findOne(
      { _id: req.body.order },
      {
        invoice: 1,
        services: {
          $elemMatch: { _id: new mongoose.Types.ObjectId(req.body.service) },
        },
      }
    ).populate('customer');

    if (order.services[0].done) {
      res.status(406).json('Service alredy marked as finished');
      return;
    }
    order.services[0].done = true;
    order.save();

    if (!order.customer.PrimaryEmailAddr.Address) {
      res.status(200).json('No email address provided');
      return;
    }

    const options = {
      service: servicesName[order.services[0].serviceTag],
      name: order.customer.GivenName || order.customer.DisplayName,
      address: order.customer.PrimaryEmailAddr.Address,
      number: order.invoice,
    };
    send('test', options);

    //
    res.status(200).json('Success');
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

// functionality to update customers if there a change in QB
exports.webhook = async (req, res) => {
  const webhookPayload = JSON.stringify(req.body);
  // get segnature from payload
  const signature = req.get('intuit-signature');
  console.log(webhookPayload);
  if (!signature) {
    return res.status(401).send('FORBIDDEN');
  }
  if (!webhookPayload) {
    return res.status(200).send('success');
  }
  // hash werifier
  const hash = crypto
    .createHmac('sha256', process.env.WEBHOOK_VERIFIER_TOKEN)
    .update(webhookPayload)
    .digest('base64');
  if (signature === hash) {
    notification.push(req.body.eventNotifications[0].dataChangeEvent.entities);
    console.log(req.body.eventNotifications[0].dataChangeEvent.entities);
    res.status(200).json('s');
  } else {
    return res.status(401).send('FORBIDDEN');
  }
};

exports.checkNotification = async (req, res, next) => {
  if (!notification.length) {
    next();
  } else {
    try {
      for (const entity of notification) {
        const responseCX = await oauthClient.makeApiCall({
          url: `${process.env.QUICKBOOKSURL}${companyID}/customer/${entity[0].id}?minorversion=59`,
        });
        const { Customer: cx } = responseCX.json;
        const result = await Customer.findOneAndUpdate(
          { Id: cx.Id },
          { $set: cx },
          { new: true, upsert: true }
        );
      }
      notification = [];
    } catch (e) {
      console.log(e);
    } finally {
      next();
    }
  }
};
