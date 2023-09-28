const { getToken } = require("next-auth/jwt");
const { User, Task, Project, Label } = require("../models");

const taskController = {
	// get tasks
	getTasks: async (req, res) => {
		const token = await getToken({ req });
		const user = await User.findOne({
			where: {
				email: token.email,
			},
			select: ["squadCode"],
		});
		const { squadCode } = user;
		const tasks = await Task.findAll({
			where: {
				squadCode,
			},
			include: [
				{
					model: User,
					as: "creator",
					attributes: ["id", "name", "email", "picture"],
				},
				{
					model: Project,
					as: "project",
					attributes: ["id", "name"],
				},
				{
					model: Label,
					as: "label",
					attributes: ["id", "name", "bgColor", "textColor"],
				}
			],
		});
		
		res.json(tasks);
	},
};

module.exports = taskController;
