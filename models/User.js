var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  mail: String,
  pass: String,
  pseudo: String,
  friend: []
});

mongoose.model('User', UserSchema);