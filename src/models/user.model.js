const Sequelize = require('sequelize');
const { STRING, INTEGER, DATE, BOOLEAN } = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const user = sequelizeClient.define('users', {
    id : {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: STRING,
      allowNull: false,
    },
    isVerified: {
      field: 'is_verified',
      type: BOOLEAN,
      allowNull: true
    },
    verifyToken: {
      field: 'verify_token',
      type: STRING,
      allowNull: true,
    },
    verifyExpires: {
      field: 'verify_expires',
      type: DATE,
      allowNull: true
    },
    resetToken: {
      field: 'reset_token',
      type: STRING,
      allowNull: true
    },
    resetExpires: {
      field: 'reset_expires',
      type: DATE,
      allowNull: true
    },
    createdAt: {
      field: 'created_at',
      type: DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: DATE,
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      },
    }
  });

  user.associate = function (models) {
    user.hasMany(models.user_organization_xref);
  };

  return user;
};
