const express = require('express');
const userControler = require('../controllers/userController');
const appControler = require('../controllers/appController');

const router = express.Router();
router.get('/api/user', appControler.user);
router.get('/api/login', appControler.login);
router.get('/api/callback', appControler.callback);
router.get(
  '/api/getusers',
  appControler.checkCredentials,
  appControler.getUsers
);
router.post('/api/search', appControler.search);
router.get('/api/get/:name', appControler.checkCredentials, appControler.getCx);
router.post(
  '/api/updatesinglecx',
  appControler.checkCredentials,
  appControler.updateCx
);
router.post(
  '/api/createWorkOrder',
  appControler.checkCredentials,
  appControler.createWorkOrder
);
router.post(
  '/api/createcustomer',
  appControler.checkCredentials,
  appControler.createCustomer
);
router.get(
  '/api/getWorkOrders',
  appControler.checkCredentials,
  appControler.getWorkOrders
);
router.get(
  '/api/getWorkOrder/:orderId',
  appControler.checkCredentials,
  appControler.getWorkOrder
);
router.post(
  '/api/updateWorkOrder',
  appControler.checkCredentials,
  appControler.updateWorkOrder
);
router.post(
  '/api/updateWorkOrderStatus',
  appControler.checkCredentials,
  appControler.updateStatusWithMail
);

module.exports = router;
