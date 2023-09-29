const { getToken } = require("next-auth/jwt");
const { User, Task, Project, Label } = require("../models");
const GoogleAPISDK = require("../lib/googlesdk");

const taskController = {
	// get tasks
	getTasks: async (req, res) => {
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
		const { accessToken, refreshToken } = token;
		const user = await User.findOne({
			where: {
				email: token.email,
			},
			select: ["squadCode", "id", "calendarId"],
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
		const googleAPISDK = new GoogleAPISDK(accessToken, refreshToken);
		const event = {
			summary: title,
			description,
			start: {
				dateTime: startDate,
				timeZone: "America/Sao_Paulo",
			},
			end: {
				dateTime: dueDate,
				timeZone: "America/Sao_Paulo",
			},
			reminders: {
				useDefault: false,
				overrides: [
					{ method: "email", minutes: 24 * 60 },
					{ method: "popup", minutes: 10 },
				],
			},
		};
		const calendarEvent = await googleAPISDK.createCalendarEvent(
			user.calendarId,
			event
		);
		const projectName = await Project.findOne({
			where: {
				id: project,
			},
			select: ["name"],
		});
		const labelName = await Label.findOne({
			where: {
				id: label,
			},
			select: ["name"],
		});

		await googleAPISDK.sendEmailToSelf(
			token.email,
			"GTaskPro - New Task Created",
			`<p>Hi there, ${user.name}!</p>
			<p>A new task was created with GTaskPro:</p>
			<p><strong>Title:</strong> ${title}</p>
			<p><strong>Description:</strong> ${description}</p>
			<p><strong>Project:</strong> ${projectName.name}</p>
			<p><strong>Label:</strong> ${labelName.name}</p>
			<p><strong>Start Date:</strong> ${startDate}</p>
			<p><strong>Due Date:</strong> ${dueDate}</p>
			<p><strong>Priority:</strong> ${priority}</p>
			<p><strong>Status:</strong> ${status}</p>
			`
		);
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
			GCalendarEventId: calendarEvent.data.id,
		});
		res.json(task);
	},

	// update task
	updateTask: async (req, res) => {
		const { id, GCalendarEventId } = req.params;
		const token = await getToken({ req });
		const { accessToken, refreshToken } = token;
		const user = await User.findOne({
			where: {
				email: token.email,
			},
			select: ["squadCode", "id", "calendarId"],
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
		const searchTask = await Task.findOne({
			where: {
				id,
				creatorId: user.id,
			},
		});
		if (!searchTask) {
			return res.status(404).json({ message: "Task not found" });
		}
		const googleAPISDK = new GoogleAPISDK(accessToken, refreshToken);
		const event = {
			summary: title,
			description,
			start: {
				dateTime: startDate,
				timeZone: "America/Sao_Paulo",
			},
			end: {
				dateTime: dueDate,
				timeZone: "America/Sao_Paulo",
			},
			reminders: {
				useDefault: false,
				overrides: [
					{ method: "email", minutes: 24 * 60 },
					{ method: "popup", minutes: 10 },
				],
			},
		};
		const calendarEvent = await googleAPISDK.updateCalendarEvent(
			user.calendarId,
			searchTask.GCalendarEventId,
			event
		);
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
		const searchTask = await Task.findOne({
			where: {
				id,
				creatorId: user.id,
			},
		});
		if (!searchTask) {
			return res.status(404).json({ message: "Task not found" });
		}
		const { GCalendarEventId } = searchTask;
		const { accessToken, refreshToken } = token;
		const googleAPISDK = new GoogleAPISDK(accessToken, refreshToken);
		await googleAPISDK.calendar.events.delete({
			calendarId: user.calendarId,
			eventId: GCalendarEventId,
		});
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
