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

router.put('/friend/:id', function(req, res) {
	if(req.body.typebp == "bill"){
		var buyer = req.body.buyer;
		var users = req.body.users;
		var costPerUser = req.body.cost / users.length;

		users.forEach(function(element, index, array){
			element.cost = costPerUser;
		});
		buyer.cost=req.body.cost;
		var bill = {
			  "identifier": null,
			  "buyer": { "_id": null,
			      "mail": null,
			      "pseudo": null,
			      "cost" : null
			    },
			  "descript": null,
			  "date": null,
			  "users": []
			};
		bill.identifier = req.body.identifier;
		bill.buyer = buyer;
		bill.users = users;
		bill.descript = req.body.descript;
		bill.date = req.body.date;

		DBgroups.findOneAndUpdate({"_id" : req.body.groupeid}, {$push: {"bills": bill}}, {new: true}, function(err, doc) {
			res.json(doc);
		});
	}else if(req.body.typebp == "payment"){
		var giver = req.body.giver;
		var reciever = req.body.reciever;

		var payment = {
			  "giver": { "_id": null,
			      "mail": null,
			      "pseudo": null
			    },
			  "reciever": { "_id": null,
			      "mail": null,
			      "pseudo": null
			    },
			  "cost" : null,
			  "descript": null,
			  "date": null
		}

		payment.giver = giver;
		payment.identifier = req.body.identifier;
		payment.reciever = reciever;
		payment.cost = req.body.cost;
		payment.descript = req.body.descript;
		payment.date = req.body.date;

		DBgroups.findOneAndUpdate({"_id" : req.body.groupeid}, {$push: {"payments": payment}}, {new: true}, function(err, doc) {
			res.json(doc);
		});


	}
});

module.exports = router;