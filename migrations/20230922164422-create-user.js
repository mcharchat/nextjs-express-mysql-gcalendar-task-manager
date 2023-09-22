"use strict";

const { Squad } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Users", {
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
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
					notEmpty: true,
				},
				index: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			picture: {
				type: Sequelize.STRING,
				allowNull: true,
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
			accessToken: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			exp: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			calendarId: {
				type: Sequelize.STRING,
				allowNull: true,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Users");
	},
};
