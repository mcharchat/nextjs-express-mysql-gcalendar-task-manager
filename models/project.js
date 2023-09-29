"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Project extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.Squad, {
				foreignKey: "squadCode",
				targetKey: "code",
				as: "squad",
			});

			this.hasMany(models.Task, {
				foreignKey: "projectId",
				sourceKey: "id",
				as: "tasks",
			});
		}
	}
	Project.init(
		{
			squadCode: DataTypes.UUID,
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Project",
		}
	);
	return Project;
};
