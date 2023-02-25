const factory = require('./handleFactory');
const transaction = require('../model/transactionModel');

exports.getUser = factory.getUser(transaction);
exports.register = factory.register(transaction);
exports.login = factory.login(transaction);
