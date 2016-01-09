var mongoose = require('mongoose');

var BillSchema = new mongoose.Schema({
  userpaid: { type: String, required: true },
  usertake: { type: String, required: true },
  description: { type: String, required: true },
  date: {type: String, default: Date()},
  group: { type: String , required: true}
});

mongoose.model('Bill', BillSchema);