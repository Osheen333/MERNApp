const mongoose = require('mongoose');

const transactionschema = new mongoose.Schema(
    {
        name:String,
        email: { type: String, unique: true },
        password: String,
        cpassword:String,
    }
);

const transaction = mongoose.model('transaction', transactionschema);

module.exports = transaction;