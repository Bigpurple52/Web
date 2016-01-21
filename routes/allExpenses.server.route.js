var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var DBusers = mongoose.model('User');
var DBgroups = mongoose.model('Group');

router.get('/allExpenses/:id', function(req, res) {
	console.log("in /allExpenses/allExpenses/:id" + req.params.id);
	DBgroups.find({"users._id": req.params.id},function(err,data){
		if (err) { return (err); }
			res.json(data);
	});
});

module.exports = router;