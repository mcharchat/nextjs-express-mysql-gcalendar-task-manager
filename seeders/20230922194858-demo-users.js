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
		const squads = await queryInterface.select(null, "Squads", {});
		const firstSquadCode = squads[0].code || null;
    const variations = 9;
    const users = [];
    for (let i = 0; i < variations; i++) {
      users.push({
				email: faker.internet.email().toLowerCase(),
				name: faker.person.fullName(),
				picture: faker.image.avatar(),
				squadCode: firstSquadCode,
				accessToken: v4(),
				exp: faker.helpers.rangeToNumber({ min: 1695520121, max: 1727153318 }),
				calendarId: v4(),
				createdAt: new Date(),
				updatedAt: new Date(),
			});
    }
    await queryInterface.bulkInsert("Users", users, {});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
    await queryInterface.bulkDelete("Users", null, {});
	},
};
