var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var users = mongoose.model('User');

//Get all users
router.get('/register', function(req, res) {
      return res;
});

module.exports = router;