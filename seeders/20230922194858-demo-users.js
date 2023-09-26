"use strict";
const { faker } = require("@faker-js/faker");

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
				accessToken: faker.string.alphanumeric(64),
				refreshToken: faker.string.alphanumeric(64),
				exp: faker.helpers.rangeToNumber({ min: 1695520121, max: 1727153318 }),
				calendarId: faker.string.alphanumeric(64),
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
