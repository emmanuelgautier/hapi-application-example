'use strict';

const Sequelize = require('sequelize');

module.exports = (config) => {
  const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect,
    port: config.db.port
  });

  const schemas = {
    Task: require('./Task')(sequelize, Sequelize)
  };

  return {sequelize, schemas};
};
