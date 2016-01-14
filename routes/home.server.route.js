var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var groups = mongoose.model('Group');

router.get('/home', function(req, res) {
	 groups.find(function(err, doc) {
        if (err) {
            return (err);
        }
        res.json(doc);
    });
});

module.exports = router;