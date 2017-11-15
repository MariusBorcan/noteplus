var express = require("express")
var sequelize = require("sequelize")
var app = express()

app.use(express.static('public'))
app.use(express.json());       
app.use(express.urlencoded({extended : true}));

app.listen(8080)
