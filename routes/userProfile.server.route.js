var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var users = mongoose.model('User');

router.get('/userProfile/:id', function(req, res) {
	users.find(function(err, doc) {
        if (err) {
            return (err);
        }
        res.json(doc);
    });
});

router.delete('/userProfile/:id', function(req, res) {
  users.findOneAndRemove({"_id": req.params.id}, function(err, doc) {
    if (err) { return err; }
      res.json(doc);
    });
});

router.put('/userProfile/:id', function(req, res) {

	var id = req.params.id;
	var option = {new: true};

    //Update infos
    if(req.body.pseudo){
        var update = {"mail": req.body.mail, "pass": req.body.pass, "pseudo": req.body.pseudo};

        users.findOneAndUpdate({"_id" : id}, update, option, function(err, doc) {
        	if (err) { return err; }
            res.json(doc);
        });
    //add friend
    }else{
        var friend = {};
        var currentUser = {
            "_id" : req.body.id,
            "mail" : req.body.usermail,
            "pseudo" : req.body.userpseudo
        };
        //console.log(req.body.mail);
        users.findOne({"mail": req.body.friendmail}, function(err, doc){
            if (err) { return err; }
            //Friend existe
            if(doc){
                friend ={
                    "_id" : doc._id,
                    "mail" : doc.mail,
                    "pseudo" : doc.pseudo
                };
                if(friend._id != req.params.id){
                    var checkFriend = true;
                    doc.friends.forEach(function(element, index, array){
                        if (element._id == currentUser._id){
                            checkFriend = false;
                        }
                    });
                    if(checkFriend){
                        users.findOneAndUpdate({"_id" : currentUser._id}, {$push: {"friends": friend}}, option, function(err, doc) {
                            if (err) { return err; }
                            users.findOneAndUpdate({"_id" : friend._id}, {$push: {"friends": currentUser}}, option, function(err, doc) {
                                if (err) { return err; }
                                res.send("Ami(e) ajouté(e)");
                            });
                        });
                    }else{
                        res.send("Cet utilisateur est déjà votre ami");
                    }
                }else{
                    res.send("Vous ne pouvez pas vous ajouter en ami");
                }
            }else{
                res.send("Utilisateur inconnu");
            }
        })
    }
});

module.exports = router;