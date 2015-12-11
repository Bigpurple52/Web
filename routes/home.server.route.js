var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = mongoose.model('User');
var payment = mongoose.model('Payment');
var bill = mongoose.model('Bill');

router.get('/home', function(req, res) {
      return res;
});

module.exports = router;