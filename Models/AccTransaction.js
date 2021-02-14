const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  TransactionObjectId: {
    type: String
  },
  TransactionType: {
    type: String
  },
  Amount: {
    type: String
  },
})

module.exports = mongoose.model('AccTransaction',transactionSchema, 'Transactions')