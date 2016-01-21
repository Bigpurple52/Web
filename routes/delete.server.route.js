var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var DBusers = mongoose.model('User');
var DBgroups = mongoose.model('Group');


router.get('/delete/bill/:id/:idbill', function(req, res) {
	var billsleft = [];

    DBgroups.findOne({"_id" : req.params.id}, function(err, group) {
        group.bills.forEach(function(bill, index, array){
            if(bill.identifier != req.params.idbill){
                billsleft.push(bill);
            }
        });
        DBgroups.findOneAndUpdate({"_id" : req.params.id}, {$set: {"bills" : billsleft}}, {new:true}, function(err, group){
        });
        res.json(group);
    });
});

router.get('/delete/payment/:id/:idpayment', function(req, res) {
	console.log("début du delete");
	var paymentsleft = [];

    DBgroups.findOne({"_id" : req.params.id}, function(err, group) {
        group.payments.forEach(function(payment, index, array){
        	console.log("identifiant du paiement actuel : " + payment.identifier + " id url : " + req.params.idpayment);
            if(payment.identifier != req.params.idpayment){
            	console.log("on rentre dans le if");
                paymentsleft.push(payment);
            }
        });
        DBgroups.findOneAndUpdate({"_id" : req.params.id}, {$set: {"payments" : paymentsleft}}, {new:true}, function(err, group){
        });
        res.json(group);
    });
});

module.exports = router;