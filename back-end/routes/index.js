const express = require('express');
const userControler = require('../controllers/userController');
const appControler = require('../controllers/appController');

const router = express.Router();
router.get('/api/login', appControler.login);
router.get('/api/callback', appControler.callback);
router.get(
  '/api/getusers',
  appControler.checkCredentials,
  appControler.getUsers
);

module.exports = router;
