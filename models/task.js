"use strict";
const { Model } = require("sequelize");
const { Squad, User } = require("../models");
module.exports = (sequelize, DataTypes) => {
	class Task extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Task.belongsTo(Squad, {
				foreignKey: "squadCode",
				targetKey: "code",
				as: "squad",
			});

			Task.belongsTo(User, {
				foreignKey: "assignee",
				targetKey: "id",
				as: "assignee",
			});

			Task.belongsTo(User, {
				foreignKey: "creator",
				targetKey: "id",
				as: "creator",
			});
		}
	}
	Task.init(
		{
			squadCode: DataTypes.UUID,
			projectId: DataTypes.INTEGER,
			title: DataTypes.STRING,
			description: DataTypes.TEXT,
			startDate: DataTypes.DATE,
			dueDate: DataTypes.DATE,
			priority: DataTypes.ENUM("low", "medium", "high"),
			status: DataTypes.ENUM("todo", "in-progress", "done"),
			creator: DataTypes.INTEGER,
			assignee: DataTypes.INTEGER,
			atendees: DataTypes.JSON,
			GCalendarEventId: DataTypes.STRING,
			tags: DataTypes.JSON,
		},
		{
			sequelize,
			modelName: "Task",
		}
	);
	return Task;
};
