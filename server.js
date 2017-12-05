var express = require("express")
var app = express()
var routes = require('./routes/index');
var api = require('./routes/api')
var path = require("path")

const staticAssetsPath = path.resolve(__dirname, 'public');
app.use(express.static(staticAssetsPath));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use('/', routes);
app.use('/api', api);


app.listen(8080)
