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

router.delete('/userProfile/:id/:mail', function(req, res) {
    users.findOne({"mail": req.params.mail}, function(err, doc){
        if (err) { return err; }
        //Check if the friend is actually registered
        if(doc){
            var newfriendUser;
            var newfriend;
            users.findOne({"_id": req.params.id}, function(err, currentUser) {
                var size = currentUser.friends.length;
                if (err) { return err; }
                if(size == 0){
                    res.send("Vous n'avez pas d'ami");
                }else{
                    //Search the friend in your friends list
                    newfriendUser = currentUser.friends.filter(function(element){
                        return (element.mail != req.params.mail);
                    })
                    if(size != newfriendUser.length){
                        users.findOneAndUpdate({"_id" : currentUser._id}, {$set: {"friends": newfriendUser}}, {new: true}, function(err, doc) {
                        });

                        newfriend = doc.friends.filter(function(element){
                            return (element.mail != currentUser.mail);
                        })
                        users.findOneAndUpdate({"_id" : doc._id}, {$set: {"friends": newfriend}}, {new: true}, function(err, doc) {
                        });
                        res.send("Utilisateur retiré de votre liste d'ami");
                    }else{
                        res.send("L'utilisateur n'est pas votre ami");
                    }
                }
            });
        }else{
            res.send("Utilisateur inconnu");
        }
    }); 
});

router.delete('/userProfile/:id', function(req, res) {
    //users.findOneAndRemove({"_id": req.params.id}, function(err, doc) {
    //    if (err) { return err; }
    //        res.json(doc);
    //});
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
        /*TO DO
            Update sur la liste des amis des amis du l'user qui vient de changer
            s'inpirer du delete !
        */
    //add friend
    }else{
        var friend = {};
        var currentUser = {
            "_id" : req.body.id,
            "mail" : req.body.usermail,
            "pseudo" : req.body.userpseudo
        };
        users.findOne({"mail": req.body.friendmail}, function(err, doc){
            if (err) { return err; }
            //Check if this user is actually registered
            if(doc){
                friend ={
                    "_id" : doc._id,
                    "mail" : doc.mail,
                    "pseudo" : doc.pseudo
                };
                //Check if this is not the current user
                if(friend._id != req.params.id){
                    var checkFriend = true;
                    doc.friends.forEach(function(element, index, array){
                        if (element._id == currentUser._id){
                            checkFriend = false;
                        }
                    });
                    //Check if they are not already friends
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