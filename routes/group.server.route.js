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

router.put('/group/:id', function(req, res) {
	var id = req.params.id;
	var buyer = req.body.buyer;
	var users = req.body.users;
	var costPerUser = req.body.cost / users.length;

	users.forEach(function(element, index, array){
		element.cost = costPerUser;
	});
	buyer.cost=req.body.cost;
	console.log("test2");
	var bill = {
		  "buyer": { "_id": null,
		      "mail": null,
		      "pseudo": null,
		      "cost" : null
		    },
		  "descript": null,
		  "date": null,
		  "users": []
		};
	bill.buyer = buyer;
	bill.users = users;
	console.log(req.body.descript);
	bill.descript = req.body.descript;
	bill.date = req.body.date;
	console.dir(bill);

	//res.json(bill);

	/*DBgroups.finOne({"_id": req.body.groupeid}, function(err, group){ 
	});*/

	//DBgroups.findOneAndUpdate({"_id" : req.body.groupeid}, {$push: {"bills": bill}}, option, function(err, doc) {

	/*DBgroups.findOne({'_id' : req.params.id},function(err, doc) {
        if (err) { return (err);}
        res.json(doc);
    });*/
});



module.exports = router;