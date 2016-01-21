var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({	
  type: { type: String, required: true }, //FRIEND or GROUPE	
  name: { type: String, required: true },
  users: [],
  bills: [],
  payments: []
});

mongoose.model('Group', GroupSchema);