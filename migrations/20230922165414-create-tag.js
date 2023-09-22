"use strict";

const { Squad } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Tags", {
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
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				validator: {
					isNull: false,
				},
			},
			bgColor: {
				type: Sequelize.STRING,
				allowNull: false,
				validator: {
					isNull: false,
				},
			},
			textColor: {
				type: Sequelize.STRING,
				allowNull: false,
				validator: {
					isNull: false,
				},
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Tags");
	},
};
