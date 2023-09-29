const { getToken } = require("next-auth/jwt");
const { User, Label, Task } = require("../models");

const labelController = {
	// get labels
	getLabels: async (req, res) => {
		const token = await getToken({ req });
		if (!token) {
			res.status(200).json({ message: "Unauthorized" });
			return;
		}
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
	// create label
	createLabel: async (req, res) => {
		const token = await getToken({ req });
		const user = await User.findOne({
			where: {
				email: token.email,
			},
			select: ["squadCode"],
		});
		const { squadCode } = user;
		const { name, bgColor, textColor } = req.body;
		const label = await Label.create({
			name,
			bgColor,
			textColor,
			squadCode,
		});

		res.json(label);
	},
	// update label
	updateLabel: async (req, res) => {
		const { id } = req.params;
		const { name, bgColor, textColor } = req.body;
		const label = await Label.update(
			{
				name,
				bgColor,
				textColor,
			},
			{
				where: {
					id,
				},
			}
		);

		res.json(label);
	},
	// delete label
	deleteLabel: async (req, res) => {
		const { id } = req.params;
		const label = await Label.destroy({
			where: {
				id,
			},
		});
		await Task.update(
			{
				labelId: null,
			},
			{
				where: {
					labelId: id,
				},
			}
		);
		res.json(label);
	},
};

module.exports = labelController;
