const QuickBooks = require('node-quickbooks');
const OAuthClient = require('intuit-oauth');
require('dotenv').config();
const querystring = require('querystring');
const mongoose = require('mongoose');
const Customer = require('../models/Customer');

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
    console.log(cx.Customer);
    // TODO check what info they store on customers
    const newCX = await new Customer(cx.Customer).save(); // store new CX in the DB
    res.status(200).json('Succesfuly created customer ');
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
