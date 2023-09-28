const { getToken } = require("next-auth/jwt");
const { User, Project } = require("../models");

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
};

module.exports = projectController;
