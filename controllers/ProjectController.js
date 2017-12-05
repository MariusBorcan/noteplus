'use strict';

var db = require('../models/index');


module.exports.findAll = function (req, res) {
     db.Project.findAll({
         where: {
             userId : req.params.userId
         }
     }).then(
            function(projects) {
                res.send([{
                    status: "success",
                    projects: projects
                }]);
            }
        )
};

module.exports.findById = function(req, res) {
    db.Project.findOne({where: {id:req.params.id}}).then(function(project) {
        if(project) {
            res.send([{
                status:"success",
                project: project
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
    db.Project.create(req.body).then(function(project) {
        res.send([{
            status: "success",
            project: project
        }])
    })
}

module.exports.update = function(req, res) {
    db.Project.findById(req.params.id).then(function(project) {
        if(project) {
            project.update(req.body).then(function(project){
                res.send([{
                    status:"success",
                    project: project
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
    //TODO: When deleting a project, delete also its notes
    //this will trigger by default that the tags are also deleted
    db.Project.findById(req.params.id).then(function(project) {
        if(project) {
            project.destroy().then(function(){
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
