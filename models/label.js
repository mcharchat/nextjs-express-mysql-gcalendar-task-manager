"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Label extends Model {
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
				foreignKey: "labelId",
				sourceKey: "id",
				as: "tasks",
			});
		}
	}
	Label.init(
		{
			squadCode: DataTypes.UUID,
			name: DataTypes.STRING,
			bgColor: DataTypes.STRING,
			textColor: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Label",
		}
	);
	return Label;
};
