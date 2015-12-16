var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var users = mongoose.model('User');

router.get('/userProfile/:id', function(req, res) {
    var query = {"id": req.params.id};
	 users.findOne(function(err, doc) {
        if (err) {
            return (err);
        }
        res.json(doc);
    });
});

module.exports = router;