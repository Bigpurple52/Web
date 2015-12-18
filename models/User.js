var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  mail: { type: String, required: true, unique: true },
  pass: { type: String, required: true},
  pseudo: { type: String, required: true},
  friend: []
});

mongoose.model('User', UserSchema);