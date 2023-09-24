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
    const tags = [];
    const variations = 7;
    const generateColorHex = () => {
      const hex = Math.floor(Math.random() * 16777215).toString(16);
      return `#${hex}`;
    };
    for (let i = 0; i < variations; i++) {
      tags.push({
        squadCode: firstSquadCode,
        name: faker.lorem.word(),
        bgColor: generateColorHex(),
        textColor: generateColorHex(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("Tags", tags, {});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
    await queryInterface.bulkDelete("Tags", null, {});
	},
};
