const { getToken } = require("next-auth/jwt");
const { User, Project, Task } = require("../models");

const projectController = {
	// get projects
	getProjects: async (req, res) => {
		const token = await getToken({ req });
		const user = await User.findOne({
			where: {
				email: token.email,
			},
			select: ["squadCode"],
		});
		const { squadCode } = user;
		const projects = await Project.findAll({
			where: {
				squadCode,
			},
		});

		res.json(projects);
	},
	// create project
	createProject: async (req, res) => {
		const token = await getToken({ req });
		const user = await User.findOne({
			where: {
				email: token.email,
			},
			select: ["squadCode"],
		});
		const { squadCode } = user;
		const { name } = req.body;
		const project = await Project.create({
			name,
			squadCode,
		});

		res.json(project);
	},
	// update project
	updateProject: async (req, res) => {
		const { id } = req.params;
		const { name } = req.body;
		const project = await Project.update(
			{
				name,
			},
			{
				where: {
					id,
				},
			}
		);

		res.json(project);
	},

	// delete project
	deleteProject: async (req, res) => {
		const { id } = req.params;
		const project = await Project.destroy({
			where: {
				id,
			},
		});
		await Task.update(
			{
				projectId: null,
			},
			{
				where: {
					projectId: id,
				},
			}
		);

		res.json(project);
	},
};

module.exports = projectController;
