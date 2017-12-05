'use strict';

var db = require('../models/index');


module.exports.findAll = function (req, res) {
     db.User.findAll().then(
            function(users) {
                res.send([{
                    status: "success",
                    users: users
                }]);
            }
        )
};

module.exports.findById = function(req, res) {
    db.User.findOne({where: {id:req.params.id}}).then(function(user) {
        if(user) {
            res.send([{
                status:"success",
                user: user
            }])
        } else {
            res.send([{
                status:"error",
                error: "Not found"
            }])
        }
    })
};

module.exports.create = function(req, res) {

    db.User.create(req.body).then(function(user) {
        res.send([{
            status: "success",
            user: user
        }])
    })
}

module.exports.update = function(req, res) {
    db.User.findById(req.params.id).then(function(user) {
        if(user) {
            user.update(req.body).then(function(user){
                res.send([{
                    status:"success",
                    user: user
                }])
            }).catch(function(error) {
                res.send([{
                    status:"error",
                    error: error
                }])
            })
        } else {
            res.send([{
                status:"error",
                error: "Not found"
            }])
        }
    })
}

module.exports.delete = function(req, res) {
    //TODO: When deleting a user, delete also it's projects
    //this will trigger by default that the notes are also deleted
    db.User.findById(req.params.id).then(function(user) {
        if(user) {
            user.destroy().then(function(){
                res.send([{
                    status: "success"
                }])
            })
        } else {
            res.send([{
                status:"error",
                error: "Not found"
            }])
        }
    })
}
