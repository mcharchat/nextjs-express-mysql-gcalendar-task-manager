"use strict";

const { Squad, User, Project } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Tasks", {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			squadCode: {
				type: Sequelize.UUID,
				allowNull: false,
				index: true,
				validate: {
					isUUID: 4,
				},
				reference: {
					model: Squad,
					key: "code",
				},
			},
			projectId: {
				type: Sequelize.INTEGER,
				allowNull: true,
				index: true,
				reference: {
					model: Project,
					key: "id",
				},
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: "Untitled",
				validator: {
					isNull: false,
				},
			},
			description: {
				type: Sequelize.TEXT("long"),
				allowNull: true,
			},
			startDate: {
				type: Sequelize.DATE,
				allowNull: false,
				validator: {
					isNull: false,
					isDate: true,
					isAfter: new Date(),
					isSmallerThanDueDate(value) {
						if (this.dueDate < value) {
							throw new Error("Start date must be before due date");
						}
					},
				},
			},
			dueDate: {
				type: Sequelize.DATE,
				allowNull: false,
				validator: {
					isNull: false,
					isDate: true,
					isAfter: new Date(),
					isGreaterThanStartDate(value) {
						if (this.startDate > value) {
							throw new Error("Due date must be after start date");
						}
					},
				},
			},
			priority: {
				type: Sequelize.ENUM("low", "medium", "high"),
				allowNull: true,
				validator: {
					isIn: [["low", "medium", "high"]],
				},
			},
			status: {
				type: Sequelize.ENUM(
					"backlog",
					"todo",
					"in progress",
					"done",
					"cancelled"
				),
				allowNull: false,
				defaultValue: "todo",
				validator: {
					isNull: false,
					isIn: [["backlog", "todo", "in progress", "done", "cancelled"]],
				},
			},
			creator: {
				type: Sequelize.INTEGER,
				allowNull: false,
				index: true,
				reference: {
					model: User,
					key: "id",
				},
			},
			GCalendarEventId: {
				type: Sequelize.STRING,
				allowNull: false,
				validator: {
					isNull: false,
				},
			},
			labels: {
				type: Sequelize.JSON,
				allowNull: true,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Tasks");
	},
};
