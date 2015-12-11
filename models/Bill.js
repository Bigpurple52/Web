var mongoose = require('mongoose');

var BillSchema = new mongoose.Schema({
  userpaid: String,
  users: [],
  date: {type: String, default: date()}
});

mongoose.model('Bill', BillSchema);