const express = require('express');
const transactionController = require('./../controllers/transactionController');
const multer = require('multer');
const router = express.Router();
router
    .post('/user', transactionController.getUser)
    .post('/register', transactionController.register)
    .post('/login', transactionController.login)

    // .post('/', transactionController.createtransaction)
    // .post('/', transactionController.createtransaction)
    // .post('/upload', upload.single('data') ,transactionController.uploadtransactions)
    // .get('/:id', transactionController.gettransaction)
    // .patch('/:id', transactionController.updatetransaction)
    // .delete('/:id', transactionController.deletetransaction);

module.exports = router;