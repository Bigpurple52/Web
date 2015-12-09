var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Backlog = mongoose.model('Backlog');

//Get all backlogs
router.get('/backlogs', function(req, res) {
      return res;
});

module.exports = router;