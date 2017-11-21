var express = require("express")
var Sequelize = require("sequelize")
var app = express()


//connect to mysql database
var sequelize = new Sequelize('noteplus', 'root', '', {
    dialect:'mysql',
    host:'localhost'
})

sequelize.authenticate().then(function(){
    console.log('Success')
})

var Users = sequelize.define('users', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.TEXT,
    githubUrl: Sequelize.STRING,
    imageUrl: Sequelize.STRING,
    organization: Sequelize.STRING,
    location: Sequelize.STRING,
    website: Sequelize.STRING

})

var Projects = sequelize.define('projects', {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    githubUrl: Sequelize.STRING
})

var Notes = sequelize.define('notes', {
    title: Sequelize.STRING,
    text: Sequelize.STRING
})

var Tags = sequelize.define('tags', {
    text: Sequelize.STRING
})

Notes.hasMany(Tags, { foreignKey: "id"})
Tags.belongsTo(Notes, {foreignKey: "id"})

Projects.hasMany(Notes, {foreignKey: "id"})
Notes.belongsTo(Projects, {foreignKey: "id"})

Users.hasMany(Projects, {foreignKey: "id"})
Projects.belongsTo(Users, {foreignKey: "id"})

app.use(express.static('public'))
app.use('/public', express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.get('/projects', function(request, response) {
    Projects.findAll().then(
            function(projects) {
                response.status(200).send(projects)
            }
        )
})

app.get('/projects/:id', function(request, response) {
    Projects.findOne({where: {id:request.params.id}}).then(function(project) {
        if(project) {
            response.status(200).send(project)
        } else {
            response.status(404).send()
        }
    })
})

app.post('/projects', function(request, response) {
    Projects.create(request.body).then(function(project) {
        response.status(201).send(project)
    })
})

app.put('/projects/:id', function(request, response) {
    Projects.findById(request.params.id).then(function(project) {
        if(project) {
            project.update(request.body).then(function(project){
                response.status(201).send(project)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/projects/:id', function(request, response) {
    //TODO: When deleting a project, delete all of its notes
    Projects.findById(request.params.id).then(function(project) {
        if(project) {
            project.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/notes/:id', function(request, response) {
    Notes.findOne({where: {id:request.params.id}}).then(function(note) {
        if(note) {
            response.status(200).send(note)
        } else {
            response.status(404).send()
        }
    })
})

app.get('/notes', function(request, response) {
    Notes.findAll().then(
            function(notes) {
                response.status(200).send(notes)
            }
        )
})


app.post('/notes', function(request, response) {
    Notes.create(request.body).then(function(note) {
        response.status(201).send(note)
    })
})

app.put('/notes/:id', function(request, response) {
    Notes.findById(request.params.id).then(function(note) {
        if(note) {
            note.update(request.body).then(function(note){
                response.status(201).send(note)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/notes/:id', function(request, response) {
    //TODO: when deleting a note, also delete all its tags
    Notes.findById(request.params.id).then(function(note) {
        if(note) {
            note.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/users/:id', function(request, response) {
    Users.findOne({where: {id:request.params.id}}).then(function(user) {
        if(user) {
            response.status(200).send(user)
        } else {
            response.status(404).send()
        }
    })
})

app.get('/users', function(request, response) {
    Users.findAll().then(
            function(users) {
                response.status(200).send(users)
            }
        )
})

app.post('/users', function(request, response) {
    Users.create(request.body).then(function(user) {
        response.status(201).send(user)
    })
})

app.put('/users/:id', function(request, response) {
    Users.findById(request.params.id).then(function(user) {
        if(user) {
            user.update(request.body).then(function(user){
                response.status(201).send(user)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/users/:id', function(request, response) {
    //TODO: When deleting a user, delete also it's projects
    //this will trigger by default that the notes are also deleted
    Users.findById(request.params.id).then(function(user) {
        if(user) {
            user.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/tags/:id', function(request, response) {
    Tags.findOne({where: {id:request.params.id}}).then(function(tag) {
        if(tag) {
            response.status(200).send(tag)
        } else {
            response.status(404).send()
        }
    })
})

app.get('/tags', function(request, response) {
    Tags.findAll().then(
            function(tags) {
                response.status(200).send(tags)
            }
        )
})

app.post('/tags', function(request, response) {
    Tags.create(request.body).then(function(tag) {
        response.status(201).send(tag)
    })
})

app.put('/tags/:id', function(request, response) {
    Tags.findById(request.params.id).then(function(tag) {
        if(tag) {
            tag.update(request.body).then(function(tag){
                response.status(201).send(tag)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/tags/:id', function(request, response) {
    //TODO: When deleting a user, delete also it's projects
    //this will trigger by default that the notes are also deleted
    Tags.findById(request.params.id).then(function(user) {
        if(user) {
            user.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.listen(8080)
