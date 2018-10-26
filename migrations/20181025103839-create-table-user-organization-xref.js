'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_organization_xrefs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' }
      },
      organization_id: {
        type: Sequelize.INTEGER,
        references: { model: 'organizations', key: 'id' }
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('user_organization_xref');
  }
};
