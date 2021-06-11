"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
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
	}
	User.init(
		{
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isEmail: {
						args: true,
						msg: "Email must be email format",
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				validate: {
					len: {
						args: [5, 32],
						msg: "Password must be at least 5 characters",
					},
				},
			},
		},
		{
			hooks: {
				beforeCreate(user) {
					const salt = bcrypt.genSaltSync(10);
					const hash = bcrypt.hashSync(String(user.password), salt);
					user.password = hash;
					return user;
				},
			},
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
