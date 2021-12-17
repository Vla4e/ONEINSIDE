const Sequelize = require('sequelize')

const config = require('./config/config.js')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  port: config.port,
  dialect: config.dialect
})

sequelize
  .authenticate()
  .then(function() {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  })