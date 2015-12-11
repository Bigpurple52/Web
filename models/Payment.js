var mongoose = require('mongoose');

var PaymentSchema = new mongoose.Schema({
  userpaid: String,
  usertake: String,
  amount: {type: Number, default: 0},
  date: {type: String, default: Date()}
});

mongoose.model('Payment', PaymentSchema);