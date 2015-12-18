var mongoose = require('mongoose');

var BillSchema = new mongoose.Schema({
  userpaid: { type: String, required: true },
  users: [],
  date: {type: String, default: Date()}
});

mongoose.model('Bill', BillSchema);