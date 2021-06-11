"use strict";
let users = require("../db.json").users;
const bcrypt = require("bcrypt");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		users = users.map((user) => {
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(user.password, salt);
			user.password = hash;
			return {
				...user,
				createdAt: new Date(),
				updatedAt: new Date(),
			};
		});
		await queryInterface.bulkInsert("Users", users);
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete("Users", null, {});
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
