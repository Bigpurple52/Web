var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
  name: String,
  users: []
});

mongoose.model('Group', GroupSchema);