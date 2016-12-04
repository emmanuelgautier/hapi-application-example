'use strict';

module.exports = (sequelize, Sequelize) => {

  const Task = sequelize.define('Task', {
    uuid: {
      type: Sequelize.UUID,
      allowNull: false,
      primary: true
    },

    name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },

    description: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'tasks',
    timestamps: true,
    paranoid: true,
    underscored: true
  });

  return Task;
};
