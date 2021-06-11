"use strict";
let inventories = require("../db.json").inventories;

module.exports = {
	up: async (queryInterface, Sequelize) => {
		inventories = inventories.map((inv) => {
			return {
				...inv,
				createdAt: new Date(),
				updatedAt: new Date(),
			};
		});
		await queryInterface.bulkInsert("Inventories", inventories);
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
		await queryInterface.bulkDelete("Inventories", null, {});
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
