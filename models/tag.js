"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Tag extends Model {
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
		}
	}
	Tag.init(
		{
			squadCode: DataTypes.UUID,
			name: DataTypes.STRING,
			bgColor: DataTypes.STRING,
			textColor: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Tag",
		}
	);
	return Tag;
};
