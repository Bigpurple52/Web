var mongoose = require('mongoose');

var BacklogSchema = new mongoose.Schema({
  title: String,
  description: String,
  gitlink: String
});

mongoose.model('Backlog', BacklogSchema);