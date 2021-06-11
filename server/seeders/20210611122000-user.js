"use strict";
let users = require("../db.json").users;

module.exports = {
	up: async (queryInterface, Sequelize) => {
		users = users.map((user) => {
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
