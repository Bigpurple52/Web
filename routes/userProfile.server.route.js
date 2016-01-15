var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var users = mongoose.model('User');
var groups = mongoose.model('Group');

router.get('/userProfile/:id', function(req, res) {
	users.find(function(err, doc) {
        if (err) { return (err); }
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
    var updatefriend = [];
    users.findOneAndRemove({"_id": req.params.id}, function(err, doc) {
        if (err) { return err; }
        doc.friends.forEach(function(element, index, array){
            users.findOne({"_id": element._id}, function(err, user){
                updatefriend = [];
                user.friends.forEach(function(friend, pos, list){
                    if (friend._id != req.params.id){
                        updatefriend.push({"_id": friend._id, "mail": friend.mail, "pseudo": friend.pseudo});
                    }
                });
                users.findOneAndUpdate({"_id" : user._id}, {$set: {"friends": updatefriend}}, {new: true}, function(err, doc) {
                });
            });
        });
        res.json(doc);
    });
});

router.put('/userProfile/:id', function(req, res) {

	var id = req.params.id;
	var option = {new: true};

    //Update infos
    if(req.body.pseudo){
        var update = {"mail": req.body.mail, "pass": req.body.pass, "pseudo": req.body.pseudo};
        var updatefriend = [];

        users.findOneAndUpdate({"_id" : id}, update, option, function(err, doc) {
        	if (err) { return err; }
            doc.friends.forEach(function(element, index, array){
                users.findOne({"_id": element._id}, function(err, user){
                    updatefriend = [];
                    user.friends.forEach(function(friend, pos, list){
                        if (friend._id == id){
                            updatefriend.push({"_id": friend._id, "mail": req.body.mail, "pseudo": req.body.pseudo});
                        }else{
                            updatefriend.push({"_id": friend._id, "mail": friend.mail, "pseudo": friend.pseudo});
                        }
                    });
                    users.findOneAndUpdate({"_id" : user._id}, {$set: {"friends": updatefriend}}, option, function(err, doc) {
                    });
                });
            });
            groups.find(function(err, groupsresult) {
                if (err) { return (err); }
                groupsresult.forEach(function(element1, index1, array1){
                    membersgroup = [];
                    element1.users.forEach(function(element2, index2, array2){
                        if(element2._id == id){
                            membersgroup.push({"_id" : element2._id, "pseudo": req.body.pseudo, "mail": req.body.mail});
                        }else{
                            membersgroup.push({"_id": element2._id, "pseudo": element2.pseud, "mail": element2.mail});
                        }
                    });
                    groups.findOneAndUpdate({"_id" : element1._id}, {$set: {"users" : membersgroup}}, option, function(err, doc){
                    });
                });
            });
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

router.post('/userProfile/:id', function(req, res, next) {
    var group = new groups;
    group.name=req.body.name;
    group.type = "GROUP";
    group.users.addToSet(req.body.users);

    console.log(req.body);
    var query = {
        "name": req.body.name,
    };

    groups.find(query,function(err, doc) {
        if (err) {
            return err;
        }
        if(doc.length != 0){
            res.send("Nom de groupe déjà pris");
        }else{
            group.save(function(err, group) {
                if (err) {
                    return next(err);
                }
                res.send("Groupe créé !");
            });
        }
    });
});

router.put('/userProfile/:id/:add', function(req, res, next) {
    var groupName = req.body.name;
    var friendMail = req.body.friendMail; 
    var currentUser = {
        "_id" : req.body.id,
        "mail" : req.body.userMail,
        "pseudo" : req.body.userPseudo
    };
    var option = {new: true};

    // pas d'auto ajout dans un groupe
    if(friendMail == req.body.userMail){
        res.send("Vous ne pouvez pas vous ajouter à ce groupe");
    // si on essaie d'ajouter un autre utilisateur
    }else{
        groups.findOne({"name" : groupName}, function(err, doc){
            if (err) {return err;}
            var isIn = false;
            var friendIsIn = false;
            if(doc != null){
                users.findOne({"mail" : friendMail}, function(err, userFriend){
                    if (err) {return err;}
                    insertInlist(userFriend,checkInList(doc, currentUser._id,userFriend));
                });     
                    var checkInList = function(doc, id, friend){                    
                        doc.users.forEach(function(element, index, array){
                            if (element._id == id){
                                isIn = true;
                            }
                            if(friend != null){
                                if(element.mail == friend.mail){
                                    friendIsIn = true;
                                }
                            }
                        });
                    }

                    var insertInlist = function(friends){
                        // vérifie si l'utilisateur courant est déjà dans le groupe
                        if(isIn){
                            // vérifie si l'utilisateur à ajouter n'est pas déjà dans le groupe
                            if(!friendIsIn){              
                                // vérifie si il y a un utilisateur à ajouter
                                if(friends != null){
                                    var friend = {
                                    '_id' : friends._id,
                                    'pseudo' : friends.pseudo,
                                    'mail': friends.mail,
                                    };

                                    groups.findOneAndUpdate({"name" : groupName}, {$push: {"users": friend}}, option, function(err, data) {
                                        if (err) { return err; }
                                        res.send("Ami(e) ajouté(e)");
                                        data.users.forEach(function(element, index, array){
                                            addRelationship(element, friend);
                                        });
                                    });
                                }else{
                                    res.send("Utilisateur inconnu");
                                } 
                            }else{
                                res.send("Utilisateur déjà dans le groupe.");
                            }
                        }else{
                            res.send("Vous ne pouvez pas ajouter quelqu'un dans un groupe dont vous ne faites pas parti.")
                        }
                    }                 
            }else{
                res.send("Groupe inexistant");
            }
        });
    }  
    var addRelationship = function (element, friend) {
        // vérifie que le mail de l'utilisateur à ajouter est différent de l'utilisateur du groupe sélectionné
        if (element.mail != friend.mail){
            var isfriend = false;
            // récupère l'utilisateur à ajouter
            users.findOne({"mail" : friend.mail}, function(err, userFriend){
                userFriend.friends.forEach(function(ami, index, array){
                    // vérifie si l'utilisateur du groupe sélectionné fait déjà parti des amis de l'utilisateur ajouté
                    if(ami.mail == element.mail){
                        isfriend = true;
                    }
                });

                // si l'utilisateur du groupe sélectionné ne fait pas parti des amis de l'utilisateur ajouté alors on l'ajoute
                if(!isfriend){
                    users.findOneAndUpdate({"_id" : friend._id}, {$push: {"friends": element}}, option, function(err, doc) {
                        if (err) { return err; }
                        users.findOneAndUpdate({"_id" : element._id}, {$push: {"friends": friend}}, option, function(err, doc) {
                            if (err) { return err; }
                            var group = new groups({'type' : "FRIEND", 'name' : ""+friend._id+element._id, "users" : [friend, element]});
                            group.save(function(err, group) {
                                if (err) {
                                    return next(err);
                                }
                            });
                        });
                    });
                }
            });
        }
    }
});

module.exports = router;