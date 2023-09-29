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
		const users = await queryInterface.select(null, "Users", {});
		const labels = await queryInterface.select(null, "Labels", {});
		const projects = await queryInterface.select(null, "Projects", {});
		const tasks = [];
		const variations = 50;
		const priorities = ["low", "medium", "high"];
		const statuses = ["backlog", "todo", "in progress", "done", "canceled"];
		for (let i = 0; i < variations; i++) {
			tasks.push({
				squadCode: firstSquadCode,
				projectId: projects[Math.floor(Math.random() * projects.length)].id,
				title: faker.lorem.sentence(),
				description: faker.lorem.paragraph(),
				startDate: faker.date.past(),
				dueDate: faker.date.future(),
				priority: priorities[Math.floor(Math.random() * priorities.length)],
				status: statuses[Math.floor(Math.random() * statuses.length)],
				creatorId: users[Math.floor(Math.random() * users.length)].id,
				GCalendarEventId: faker.string.alphanumeric(64),
				labelId: labels[Math.floor(Math.random() * labels.length)].id,
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		}
		await queryInterface.bulkInsert("Tasks", tasks, {});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete("Tasks", null, {});
	},
};
