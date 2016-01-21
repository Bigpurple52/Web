var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var users = mongoose.model('User');

router.get('/connection', function(req, res) {
	 users.find(function(err, doc) {
        if (err) {
            return (err);
        }
        res.json(doc);
    });
});

router.post('/connection', function(req, res) {
	var query = {
        "mail": req.body.mail,
        "pass": req.body.pass
	};
	
    users.find(query,function(err, doc) {
        if (err) {
            return (err);
        }
        req.session.user = doc;
        res.send(doc);
    });
});

module.exports = router;