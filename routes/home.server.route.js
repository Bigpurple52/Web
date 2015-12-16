var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var users = mongoose.model('User');

router.get('/home', function(req, res) {
	 users.find(function(err, doc) {
        if (err) {
            return (err);
        }
        res.json(doc);
    });
});

module.exports = router;