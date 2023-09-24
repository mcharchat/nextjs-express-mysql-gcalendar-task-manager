"use strict";
const { faker } = require("@faker-js/faker");
const { v4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		const newSquadCode = v4();
		await queryInterface.bulkInsert(
			"Squads",
			[
				{
					code: newSquadCode,
					name: `Squad ${faker.location.city()}`,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
		console.log(`A new squad was created with the code: ${newSquadCode}`);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		// empty table Squads
		await queryInterface.bulkDelete("Squads", null, {});
	},
};
