const QuickBooks = require('node-quickbooks');
const OAuthClient = require('intuit-oauth');
require('dotenv').config();
const querystring = require('querystring');
const mongoose = require('mongoose');
const Customer = require('../models/Customer');
const WorkOrder = require('../models/WorkOrder');

// TODO make dynamic
const companyID = '4620816365161933290';
const oauthClient = new OAuthClient({
  clientId: process.env.QUICKBOOKS_USER_NAME,
  clientSecret: process.env.QUICKBOOKS_USER_SECRET,
  environment: 'sandbox',
  redirectUri: 'http://localhost:5000/api/callback',
});

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
    };
  } catch (error) {
    console.error(error);
  }

  res.redirect('http://localhost:3000/');
};

exports.checkCredentials = async (req, res, next) => {
  // check the is token exist
  if (!req.session.user) {
    // TODO try to fix this
    console.log('no user');
    res.status(403).json({ error: 'Acces Denied first block' }); // if no user acces denied function returns you need to log in again.
    return;
  }
  if (!oauthClient.isAccessTokenValid(req.session.user.accesToken)) {
    // if token is invalid try to refresh it if success procide
    try {
      await oauthClient.refreshUsingToken(req.session.user.refreshToken);
      console.log('refresh token');
      req.session.user = {
        accesToken: oauthClient.token.access_token,
        refreshToken: oauthClient.token.refresh_token,
      };
      next();
    } catch (error) {
      console.log('reffresh error');
      res.status(403).json({ error }); // if no user acces denied function returns you need to log in again.
    }
  } else {
    // the token is valid you can make an API call
    console.log('token is valid');
    next();
  }

  // else try to avtorize it again
};

exports.getUsers = async (req, res) => {
  const query = querystring.escape('select * from Customer');

  try {
    console.log('try to call');
    const response = await oauthClient.makeApiCall({
      url: `https://sandbox-quickbooks.api.intuit.com/v3/company/${companyID}/query?query=${query}&minorversion=57`,
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
      DisplayName: { $regex: regex },
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
      url: `https://sandbox-quickbooks.api.intuit.com/v3/company/${companyID}/customer?minorversion=57`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body.cx),
    });
    const cx = JSON.parse(response.body);
    // TODO check what info they store on customers
    const newCX = await new Customer(cx.Customer).save(); // store new CX in the DB
    // send customer Dispaly name and redirect to Customer page
    res.status(200).json('Succesfuly created customer ');
  } catch (e) {
    console.log(e);
    res.status(400).jason(e);
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
  delete data._id;
  delete data.__v;
  data.sparse = true;
  try {
    const response = await oauthClient.makeApiCall({
      url: `https://sandbox-quickbooks.api.intuit.com/v3/company/${companyID}/customer?minorversion=57`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const cx = JSON.parse(response.body);
    const newCx = await Customer.findOneAndUpdate(
      { DisplayName: cx.Customer.DisplayName },
      { $set: cx.Customer },
      { new: true }
    );

    res.json(newCx);
  } catch (e) {
    res.status(400).json(e);
  }
};
exports.createWorkOrder = async (req, res) => {
  // TODO make this functional
  console.log(req.body);
  try {
    const order = await new WorkOrder(req.body).save();
    res.status(200).json('success');
  } catch (e) {
    console.error(e);
    res.staus(400).json(e);
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
        $sort: {
          createdAt: -1,
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
    const data = sortByStatus.reduce(
      (a, v) => ({ ...a, [v._id]: [...v.docs] }),
      {}
    );
    res.json(data);
  } catch (e) {
    console.error(e);
    res.json(e);
  }
};
