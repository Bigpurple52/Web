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

router.delete('/userProfile/:id', function(req, res) {
  users.findOneAndRemove({_id: req.params.id}, function(err, doc) {
    if (err) { return err; }
      res.json(doc);
    });
});

router.put('/userProfile/:id', function(req, res) {

	var query = req.params.id;
	var update = {mail: req.body.mail, pass: req.body.pass, pseudo: req.body.pseudo};
	var option = {new: true};

    users.findOneAndUpdate(query, update, option, function(err, doc) {
    	if (err) { return err; }
    	console.log(doc);
        res.json(doc);
    });
});

module.exports = router;