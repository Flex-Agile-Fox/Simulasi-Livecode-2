'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    email: {
      DataTypes: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'email tidak boleh kosong'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password tidak boleh kosong'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate (pass) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(pass.password, salt);
        pass.password = hash
      }
    },
    modelName: 'User',
  });
  return User;
};