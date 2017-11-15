var express = require("express")
var sequelize = require("sequelize")
var app = express()

app.use(express.static('public'))
app.use('/public', express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//connect to mysql database
var sequelize = new sequelize('noteplus', 'root', '', {
    dialect:'mysql',
    host:'localhost'
})

sequelize.authenticate().then(function(){
    console.log('Success')
})

app.listen(8080)
