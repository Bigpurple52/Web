var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  mail: { type: String, required: true, unique: true },
  pass: { type: String, required: true},
  pseudo: { type: String, required: true},
  friends: []
});

mongoose.model('User', UserSchema);