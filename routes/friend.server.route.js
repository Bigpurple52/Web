var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var users = mongoose.model('User');
var DBgroups = mongoose.model('Group');

/*
router.get('/friend', function(req, res) {
     DBgroups.find({'type':'FRIEND'},function(err, doc) {
        if (err) { return (err);}
        res.json(doc);
    });
});*/

router.get('/friend/:id', function(req, res) {
	DBgroups.findOne({'_id' : req.params.id},function(err, doc) {
        if (err) { return (err);}
        res.json(doc);
    });
});



module.exports = router;