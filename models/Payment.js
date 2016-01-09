var mongoose = require('mongoose');

var PaymentSchema = new mongoose.Schema({
  userpaid: { type: String, required: true},
  usertake: { type: String, required: true},
  amount: {type: Number, default: 0},
  date: {type: String, default: Date()}
});

mongoose.model('Payment', PaymentSchema);