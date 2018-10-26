const Sequelize = require('sequelize');
const { INTEGER } = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const usersOrganizationXref = sequelizeClient.define('UserOrganizationXref', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      field: 'user_id',
      type: INTEGER,
      allowNull: false,
    },
    organizationId: {
      field: 'organization_id',
      type: INTEGER,
      allowNull: false,
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      },
    },
    createdAt: false,
    updatedAt: false,
  });

  usersOrganizationXref.associate = function (models) {
  };

  return usersOrganizationXref;
};
