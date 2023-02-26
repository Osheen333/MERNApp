const express = require('express');
const transactionController = require('./../controllers/transactionController');
const middleware = require("./../utils/middleware");
const router = express.Router();
router
    .post('/user', middleware(), transactionController.getUser)
    .post('/register', transactionController.register)
    .post('/login', transactionController.login)

module.exports = router;