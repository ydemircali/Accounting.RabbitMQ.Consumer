var mongoose = require("mongoose");
var amqp = require('amqplib/callback_api');
const AccTransaction = require('./Models/AccTransaction')

mongoose.connect('mongodb://localhost/Accounting', 
{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

amqp.connect('amqp://localhost', function (errorAmqp, connection) {
    if (errorAmqp) {
        throw errorAmqp;
    }
    connection.createChannel(function (errorchannel, channel) {
        if (errorchannel) {
            throw errorchannel;
        }

        var queue = 'AccTransactions';
        channel.assertQueue(queue, {
            durable: false
        });
 
        console.log("Queue listening...", queue);
 
        channel.consume(queue, function (data) {
            item = JSON.parse(data.content.toString())
            WriteMongo(item);
        },  { noAck: true });
    });
});

function WriteMongo(item) {

    var accTransactionItem = new AccTransaction(item);
    accTransactionItem.save();
    console.log("Added Queue TransacripnObjectId", accTransactionItem.TransactionObjectId);
  }