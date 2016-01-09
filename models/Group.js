var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  users: []
});

mongoose.model('Group', GroupSchema);