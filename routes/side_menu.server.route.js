
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var DBusers = mongoose.model('User');
var DBgroups = mongoose.model('Group');

router.get('/side_menu/friends/:mail', function(req, res) {
	//console.log("in /side_menu/friends/:mail" + req.params.mail);
	DBusers.find({"friends.mail": req.params.mail},function(err, data){
        if (err) { return (err); }
        //console.log(data);
        res.json(data);
    });
});


router.get('/side_menu/groups/:mail', function(req, res) {
	//console.log("in /side_menu/groups/:id"+ req.params.mail);
	DBgroups.find({"users.mail": req.params.mail, "type": "GROUP"},function(err,data){
		if (err) { return (err); }
			//console.log(data);
			res.json(data);
			});
});

module.exports = router;