var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var users = mongoose.model('User');

router.get('/register', function(req, res) {
    users.find(function(err, doc) {
        if (err) {
            return (err);
        }
        res.json(doc);
    });
});

router.post('/register', function(req, res, next) {
    var user = new users(req.body);

    var query = {
        "mail": req.body.mail,
    };

    users.find(query,function(err, doc) {
        if (err) {
            return (err);
        }
        if(doc.length != 0){
            res.send("erreur");
        }else{
            user.save(function(err, user) {
                if (err) {
                    return next(err);
                }
                res.json(user);
            });
        }
    });

    
});

module.exports = router;