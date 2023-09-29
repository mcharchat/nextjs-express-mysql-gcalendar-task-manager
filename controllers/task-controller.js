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
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}
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
				},
			],
		});

		res.json(tasks);
	},

	// create task
	createTask: async (req, res) => {
		const token = await getToken({ req });
		const user = await User.findOne({
			where: {
				email: token.email,
			},
			select: ["squadCode", "id"],
		});
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		const { squadCode } = user;
		const {
			title,
			description,
			project,
			label,
			startDate,
			dueDate,
			priority,
			status,
		} = req.body;
		const task = await Task.create({
			title,
			description,
			projectId: project,
			labelId: label,
			squadCode,
			creatorId: user.id,
			startDate,
			dueDate,
			priority,
			status,
		});
		res.json(task);
	},

	// update task
	updateTask: async (req, res) => {
		const { id } = req.params;
		const token = await getToken({ req });
		const user = await User.findOne({
			where: {
				email: token.email,
			},
			select: ["squadCode", "id"],
		});
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		const {
			title,
			description,
			project,
			label,
			startDate,
			dueDate,
			priority,
			status,
		} = req.body;
		const task = await Task.update(
			{
				title,
				description,
				projectId: project,
				labelId: label,
				startDate,
				dueDate,
				priority,
				status,
			},
			{
				where: {
					id,
					creatorId: user.id,
				},
			}
		);
		res.json(task);
	},

	// delete task
	deleteTask: async (req, res) => {
		const { id } = req.params;
		const token = await getToken({ req });
		const user = await User.findOne({
			where: {
				email: token.email,
			},
			select: ["squadCode", "id"],
		});
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		const task = await Task.destroy({
			where: {
				id,
				creatorId: user.id,
			},
		});
		res.json(task);
	},
};

module.exports = taskController;
