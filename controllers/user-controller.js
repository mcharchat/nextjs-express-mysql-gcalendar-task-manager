const { getToken } = require("next-auth/jwt");
const { User, Squad } = require("../models");
const GoogleAPISDK = require("../lib/googlesdk");

const userController = {
	// GET users/me
	getUsersMe: async (req, res) => {
		//const secret = process.env.NEXTAUTH_SECRET;
		const token = await getToken({ req });
		const { accessToken, exp } = token;
		// try to find the user in the database
		const user = await User.findOne({
			where: {
				email: token.email,
			},
			select: ["name", "email", "picture", "squadCode"],
		});
		if (user) {
			await User.update(
				{
					accessToken,
					exp,
				},
				{
					where: {
						email: token.email,
					},
				}
			);
		}

		res.json(user);
	},
	// PUT users/me
	putUsersMe: async (req, res) => {
		const token = await getToken({ req });
		const { name, email, picture, exp, accessToken, refreshToken } = token;
		const { squadCode } = req.body;

		// check if the squad exists
		const squad = await Squad.findOne({
			where: {
				code: squadCode,
			},
		});
		if (!squad) {
			await Squad.create({
				code: squadCode,
			});
		}
		// check if the user exists
		const user = await User.findOne({
			where: {
				email,
			},
		});
		const googleAPISDK = new GoogleAPISDK(accessToken, refreshToken);
		const calendars = await googleAPISDK.getCalendars();

		// check if the calendar exists
		const hasCalendar = calendars.data.items.find(
			(calendar) => calendar.summary === "Tarefas - Desafio Akm"
		);

		let calendar;
		if (!hasCalendar) {
			const createCalendar = await googleAPISDK.createCalendar(
				"Tarefas - Desafio Akm"
			);
			calendar = createCalendar.data;
		} else {
			calendar = hasCalendar;
		}
		const calendarId = calendar.id;

		if (user) {
			await User.update(
				{
					name,
					email,
					picture,
					squadCode,
					accessToken,
					refreshToken,
					exp,
					calendarId,
				},
				{
					where: {
						email,
					},
				}
			);
		} else {
			await User.create({
				name,
				email,
				picture,
				squadCode,
				accessToken,
				refreshToken,
				exp,
				calendarId,
			});
		}

		res.json({
			name,
			email,
			picture,
			squadCode,
		});
	},
};

module.exports = userController;
