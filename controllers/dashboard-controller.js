const { getToken } = require("next-auth/jwt");
const { User, Task } = require("../models");

const dashboardController = {
	// GET dashboard
	getDashboard: async (req, res) => {
		const token = await getToken({ req });
		const { accessToken, exp } = token;
		// try to find the user in the database
		const user = await User.findOne({
			where: {
				email: token.email,
			},
			select: ["name", "email", "picture", "squadCode"],
		});
		if (!user) {
			res.status(404).json({
				message: "User not found",
			});
		}
		const allTasks = await Task.findAll({
			where: {
				squadCode: user.squadCode,
			},
		});

		const allTasksStatusCounts = allTasks.reduce((acc, task) => {
			if (acc[task.status]) {
				acc[task.status] += 1;
			} else {
				acc[task.status] = 1;
			}
			return acc;
		}, {});

		const myTasks = allTasks.filter((task) => task.creatorId === user.id);

		const myTasksStatusCounts = myTasks.reduce((acc, task) => {
			if (acc[task.status]) {
				acc[task.status] += 1;
			} else {
				acc[task.status] = 1;
			}
			return acc;
		}, {});

		const bigNumbersData = Object.keys(myTasksStatusCounts).map((type) => ({
			type,
			value: myTasksStatusCounts[type],
		}));

		const myTasksOverviewData = Object.keys(myTasksStatusCounts).map(
			(type) => ({
				name: type.charAt(0).toUpperCase() + type.slice(1),
				type,
				value: myTasksStatusCounts[type],
				group: "My Tasks",
			})
		);

		const allTasksOverviewData = Object.keys(allTasksStatusCounts).map(
			(type) => ({
				name: type.charAt(0).toUpperCase() + type.slice(1),
				type,
				value: allTasksStatusCounts[type],
				group: "Everyone's tasks",
			})
		);

		const myTasksForThisWeek = myTasks.filter((task) => {
			const taskDate = new Date(task.dueDate);
			const today = new Date();
			const daysSinceTaskCreated = (today - taskDate) / (1000 * 60 * 60 * 24);
			if (task.status === "todo" || task.status === "in progress") {
				return daysSinceTaskCreated <= 7;
			}
		});

		res.json({
			squadCode: user.squadCode,
			bigNumbersData,
			overviewData: {
				myData: myTasksOverviewData,
				allData: allTasksOverviewData,
			},
            myTasksForThisWeek,
		});
	},
};

module.exports = dashboardController;
