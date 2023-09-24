"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Squad extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.User, {
				foreignKey: "squadCode",
				sourceKey: "code",
				as: "users",
			});

			this.hasMany(models.Project, {
				foreignKey: "squadCode",
				sourceKey: "code",
				as: "projects",
			});

			this.hasMany(models.Task, {
				foreignKey: "squadCode",
				sourceKey: "code",
				as: "tasks",
			});

			this.hasMany(models.Tag, {
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
