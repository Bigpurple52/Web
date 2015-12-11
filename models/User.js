var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  mail: String,
  pass: String,
  pseudo: String,
  ami: []
});

mongoose.model('User', UserSchema);