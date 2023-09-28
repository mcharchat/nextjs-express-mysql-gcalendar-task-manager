const { getToken } = require("next-auth/jwt");
const { User, Label } = require("../models");

const labelController = {
	// get labels
	getLabels: async (req, res) => {
		const token = await getToken({ req });
		const user = await User.findOne({
			where: {
				email: token.email,
			},
			select: ["squadCode"],
		});
		const { squadCode } = user;
		const labels = await Label.findAll({
			where: {
				squadCode,
			},
		});

		res.json(labels);
	},
};

module.exports = labelController;
