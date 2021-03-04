const QuickBooks = require('node-quickbooks');
const OAuthClient = require('intuit-oauth');
const mongoose = require('mongoose');

const oauthClient = new OAuthClient({
  clientId: process.env.QUICKBOOKS_USER_NAME,
  clientSecret: process.env.QUICKBOOKS_USER_SECRET,
  environment: 'sandbox',
  redirectUri: 'http://localhost:5000/api/callback',
});

exports.login = (req, res) => {
  const authUri = oauthClient.authorizeUri({
    scope: [OAuthClient.scopes.Accounting],
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
      oauthClient.refresh(req.session.user.refreshToken);
    } catch (error) {
      res.status(403).json({ error: 'Acces Denied' }); // if no user acces denied function returns you need to log in again.
    }
  } else {
    // the token is valid you can make an API call
    next();
  }

  // else try to avtorize it again
};

exports.getUsers = async (req, res) => {
  // if i here means that token is valid

  res.json('');
};
