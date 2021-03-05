const QuickBooks = require('node-quickbooks');
const OAuthClient = require('intuit-oauth');
require('dotenv').config();
const querystring = require('querystring');
const mongoose = require('mongoose');
const Customer = require('../models/Customer');

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
    res.status(403).json({ error: 'Acces Denied first block' }); // if no user acces denied function returns you need to log in again.
    return;
  }
  if (!oauthClient.isAccessTokenValid(req.session.user.accesToken)) {
    // if token is invalid try to refresh it if success procide
    try {
      await oauthClient.refreshUsingToken(req.session.user.refreshToken);
      console.log(oauthClient);
      req.session.user = {
        accesToken: oauthClient.token.access_token,
        refreshToken: oauthClient.token.refresh_token,
      };
      next();
    } catch (error) {
      console.log('second block');
      res.status(403).json({ error }); // if no user acces denied function returns you need to log in again.
    }
  } else {
    // the token is valid you can make an API call
    console.log('3 block');
    next();
  }

  // else try to avtorize it again
};

exports.getUsers = async (req, res) => {
  const query = querystring.escape('select * from Customer');
  const companyID = '4620816365161933290';
  try {
    console.log('try to call');
    const response = await oauthClient.makeApiCall({
      url: `https://sandbox-quickbooks.api.intuit.com/v3/company/${companyID}/query?query=${query}&minorversion=57`,
    });
    const cx = response.json.QueryResponse.Customer;
    const storesArray = cx.map((cxe) => ({
      name: cxe.DisplayName,
      email: cxe.PrimaryEmailAddr?.Address,
      phone: cxe.PrimaryPhone?.FreeFormNumber,
    }));
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
    const Customers = await Customer.find({ name: { $regex: regex } }).limit(
      10
    );
    res.json(Customers);
  } catch (e) {
    res.status(505).json(e);
  }
};

exports.createCustomer = async (req, res) => {
  console.log(req.session);
  res.json('wuba-wuba');
};
