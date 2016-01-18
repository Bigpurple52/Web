var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var DBusers = mongoose.model('User');
var DBgroups = mongoose.model('Group');

/*
router.get('/group', function(req, res) {
	 DBgroups.find({'type':'GROUP'},function(err, doc) {
        if (err) { return (err);}
        res.json(doc);
    });
});*/

router.get('/group/:id', function(req, res) {
	DBgroups.findOne({'_id' : req.params.id},function(err, doc) {
        if (err) { return (err);}
        res.json(doc);
    });
});



module.exports = router;