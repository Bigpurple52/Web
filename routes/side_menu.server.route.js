
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var DBusers = mongoose.model('User');
var DBgroups = mongoose.model('Group');

router.get('/side_menu/friends/:mail', function(req, res) {
	DBgroups.find({"users.mail": req.params.mail, "type": "FRIEND"},function(err,data){
		if (err) { return (err); }
			res.json(data);
	});
});


router.get('/side_menu/groups/:mail', function(req, res) {
	DBgroups.find({"users.mail": req.params.mail, "type": "GROUP"},function(err,data){
		if (err) { return (err); }
			res.json(data);
	});
});

module.exports = router;