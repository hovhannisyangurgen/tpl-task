'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
      is_verified: { type: Sequelize.BOOLEAN },
      verify_token: { type: Sequelize.STRING },
      verify_expires: { type: Sequelize.DATE },
      reset_token: { type: Sequelize.STRING },
      reset_expires: { type: Sequelize.DATE },
      created_at: { type: Sequelize.DATE },
      updated_at: { type: Sequelize.DATE }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('users');
  }
};
