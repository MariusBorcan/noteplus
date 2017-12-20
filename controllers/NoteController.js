'use strict';

var db = require('../models/index');


module.exports.findAll = function (req, res) {
     db.Note.findAll({
         where: {
             projectId: req.params.projectId
         }
     }).then(
            function(notes) {
                res.send({
                    status: "success",
                    notes: notes
                });
            }
        )
};

module.exports.findById = function(req, res) {
    db.Note.findOne({where: {id:req.params.id}}).then(function(note) {
        if(note) {
            res.send({
                status:"success",
                note: note
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
    db.Note.create(req.body).then(function(note) {
        res.send({
            status: "success",
            note: note
        });
    })
}

module.exports.update = function(req, res) {
    db.Note.findById(req.params.id).then(function(note) {
        if(note) {
            note.update(req.body).then(function(note){
                res.send({
                    status:"success",
                    note: note
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
    //TODO: When deleting a note, delete also it tags
    db.Note.findById(req.params.id).then(function(note) {
        if(note) {
            note.destroy().then(function(){
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
