var Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');
const db= {};
var basename = path.basename(module.filename);

// initialize database connection
//connect to mysql database
var sequelize = new Sequelize('noteplus', 'root', '', {
    dialect:'mysql',
    host:'localhost'
})

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
		.authenticate()
		.then(() => {
			console.log('Connection has been established successfully.');
		})
		.catch((err) => {
			console.log('Unable to connect to the database:', err);
		});
		
sequelize.sync();
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import Models such that I can use them in the api just by importing 'db'
db.User = require('./User')(sequelize, Sequelize);
db.Project = require('./Project')(sequelize, Sequelize);
db.Note = require('./Note')(sequelize, Sequelize);
db.Tag = require('./Tag')(sequelize, Sequelize);

module.exports = db;