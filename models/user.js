"use strict";
const { Model } = require("sequelize");
const { Squad, Task } = require("../models");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			User.belongsTo(Squad, {
				foreignKey: "squadCode",
				targetKey: "code",
				as: "squad",
			});

			User.hasMany(Task, {
				foreignKey: "assignee",
				sourceKey: "id",
				as: "assignedTasks",
			});

			User.hasMany(Task, {
				foreignKey: "creator",
				sourceKey: "id",
				as: "createdTasks",
			});
		}
	}
	User.init(
		{
			email: DataTypes.STRING,
			name: DataTypes.STRING,
			picture: DataTypes.STRING,
			squadCode: DataTypes.UUID,
			accessToken: DataTypes.STRING,
			exp: DataTypes.INTEGER,
			calendarId: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
