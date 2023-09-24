const { getToken } = require("next-auth/jwt");
const { User } = require("../models");

const userController = {
	// GET users/me
	getUsersMe: async (req, res) => {
		//const secret = process.env.NEXTAUTH_SECRET;
		const token = await getToken({ req });
		//const accessToken = token['access-token'];
		//console.log(accessToken);
		// try to find the user in the database
		const user = await User.findOne({
			where: {
				email: token.email,
			},
			select: ["name", "email", "picture", "squadCode"],
		});

		res.json(user);
	},
	// PUT users/me
	putUsersMe: async (req, res) => {
	},
};

module.exports = userController;
