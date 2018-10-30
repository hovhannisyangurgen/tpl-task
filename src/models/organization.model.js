const Sequelize = require('sequelize');
const { INTEGER, STRING, DATE } = Sequelize;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const organization = sequelizeClient.define('organizations', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      field: 'created_at',
      type: DATE
    },
    updatedAt: {
      field: 'updated_at',
      type: DATE
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      },
    }
  });

  organization.associate = function (models) {
    organization.belongsToMany(models.users, {
      through: models.user_organization_xref
    });
    organization.hasMany(models.user_organization_xref);
  };

  return organization;
};
