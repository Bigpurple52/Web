var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var users = mongoose.model('User');
var DBgroups = mongoose.model('Group');

router.get('/edit/bill/:id/:idbill', function(req, res) {
	DBgroups.findOne({'_id' : req.params.id},function(err, group) {
        if (err) { return (err);}
        group.bills.forEach(function(element, index, array){
        	if(element.identifier == req.params.idbill){
        		var groupeBill = {
        			group: group,
        			bill: element
        		};
        		res.json(groupeBill);
        	}
        });
    });
});

router.put('/edit/bill/:id/:idbillpay', function(req, res) {
    //if(req.body.typebp == "bill"){
        var buyer = req.body.buyer;
        var users = req.body.users;
        var costPerUser = req.body.cost / users.length;

        users.forEach(function(element, index, array){
            element.cost = costPerUser;
        });
        buyer.cost=req.body.cost;

        var updatedbill = {
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
        updatedbill.buyer = buyer;
        updatedbill.users = users;
        updatedbill.descript = req.body.descript;
        updatedbill.identifier = req.body.identifier;
        updatedbill.date = req.body.date;

        var updatedbills = [];

        DBgroups.findOne({"_id" : req.body.groupeid}, function(err, group) {
            group.bills.forEach(function(bill, index, array){
                if(bill.identifier == req.body.identifier){
                    updatedbills.push(updatedbill);
                }else{
                    updatedbills.push(bill);
                }
            });
            DBgroups.findOneAndUpdate({"_id" : req.body.groupeid}, {$set: {"bills" : updatedbills}}, {new:true}, function(err, group){
            });
            res.json(group);
        });

    /*}else if(req.body.typebp == "payment"){
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


    }*/
});

module.exports = router;