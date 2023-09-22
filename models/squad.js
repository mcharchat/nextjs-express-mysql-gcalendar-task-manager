"use strict";
const { Model } = require("sequelize");
const { User, Project, Task, Tag } = require("../models");
module.exports = (sequelize, DataTypes) => {
	class Squad extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Squad.hasMany(User, {
				foreignKey: "squadCode",
				sourceKey: "code",
				as: "users",
			});

			Squad.hasMany(Project, {
				foreignKey: "squadCode",
				sourceKey: "code",
				as: "projects",
			});

			Squad.hasMany(Task, {
				foreignKey: "squadCode",
				sourceKey: "code",
				as: "tasks",
			});

			Squad.hasMany(Tag, {
				foreignKey: "squadCode",
				sourceKey: "code",
				as: "tags",
			});
		}
	}
	Squad.init(
		{
			code: DataTypes.UUID,
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Squad",
		}
	);
	return Squad;
};
