'use strict';

var db = require('../models/index');


module.exports.findAll = function (req, res) {
     db.Tag.findAll({
         where: {
             noteId : req.params.noteId,
         }
     }).then(
            function(tags) {
                res.send({
                    status: "success",
                    tags: tags
                });
            }
        )
};

module.exports.findById = function(req, res) {
    db.Tag.findOne({where: {id:req.params.id}}).then(function(tag) {
        if(tag) {
            res.send({
                status:"success",
                tag: tag
            })
        } else {
            res.send({
                status:"error",
                error: "Not found"
            })
        }
    })
};

module.exports.create = function(req, res) {
    db.Tag.create(req.body).then(function(tag) {
        res.send({
            status: "success",
            tag: tag
        })
    })
}

module.exports.update = function(req, res) {
    db.Tag.findById(req.params.id).then(function(tag) {
        if(tag) {
            tag.update(req.body).then(function(tag){
                res.send({
                    status:"success",
                    tag: tag
                })
            }).catch(function(error) {
                res.send({
                    status:"error",
                    error: error
                })
            })
        } else {
            res.send({
                status:"error",
                error: "Not found"
            })
        }
    })
}

module.exports.delete = function(req, res) {
    //TODO: When deleting a tag, delete also it tags
    db.Tag.findById(req.params.id).then(function(tag) {
        if(tag) {
            tag.destroy().then(function(){
                res.send({
                    status: "success"
                })
            })
        } else {
            res.send({
                status:"error",
                error: "Not found"
            })
        }
    })
}
