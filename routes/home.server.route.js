var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var DBgroups = mongoose.model('Group');

router.get('/home', function(req, res) {
	 DBgroups.find(function(err, doc) {
        if (err) {
            return (err);
        }
        res.json(doc);
    });
});

router.get('/home/friends/:mail', function(req, res) {
	DBgroups.find({"users.mail": req.params.mail, "type": "FRIEND"},function(err,data){
		if (err) { return (err); }
			res.json(data);
	});
});


router.get('/home/groups/:mail', function(req, res) {
	DBgroups.find({"users.mail": req.params.mail, "type": "GROUP"},function(err,data){
		if (err) { return (err); }
			res.json(data);
	});
});
module.exports = router;