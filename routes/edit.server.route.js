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

router.get('/edit/payment/:id/:idpayment', function(req, res) {
    DBgroups.findOne({'_id' : req.params.id},function(err, group) {
        if (err) { return (err);}
        group.payments.forEach(function(element, index, array){
            if(element.identifier == req.params.idpayment){
                var groupePayment = {
                    group: group,
                    payment: element
                };
                res.json(groupePayment);
            }
        });
    });
});

router.put('/edit/bill/:id/:idbillpay', function(req, res) {
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
});

router.put('/edit/payment/:id/:idpayment', function(req, res) {
    //if(req.body.typebp == "bill"){
        var giver = req.body.giver;
        var reciever = req.body.reciever;

        var updatedpayment = {
              "identifier": null,
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

        updatedpayment.giver = giver;
        updatedpayment.identifier = req.body.identifier;
        updatedpayment.reciever = reciever;
        pudatedpayment.cost = req.body.cost;
        updatedpayment.descript = req.body.descript;
        updatedpayment.date = req.body.date;

        var updatedpayments = [];

        DBgroups.findOne({"_id" : req.body.groupeid}, function(err, group) {
            group.payments.forEach(function(payment, index, array){
                if(payment.identifier == req.body.identifier){
                    updatedpayments.push(updatedpayment);
                }else{
                    updatedpayments.push(payment);
                }
            });
            DBgroups.findOneAndUpdate({"_id" : req.body.groupeid}, {$set: {"payments" : updatedpayments}}, {new:true}, function(err, group){
            });
            res.json(group);
        });
});

module.exports = router;