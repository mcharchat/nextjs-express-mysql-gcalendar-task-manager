const { google } = require("googleapis");
const { OAuth2 } = google.auth;

class GoogleAPISDK {
	constructor(accessToken, refreshToken) {
		this.client_id = process.env.GOOGLE_CLIENT_ID;
		this.client_secret = process.env.GOOGLE_CLIENT_SECRET;
		this.redirect_uri = process.env.GOOGLE_REDIRECT_URI;

		this.oAuth2Client = new OAuth2(
			this.client_id,
			this.client_secret,
			this.redirect_uri
		);
		this.oAuth2Client.setCredentials({ access_token: accessToken, refresh_token: refreshToken });

		this.calendar = google.calendar({ version: "v3", auth: this.oAuth2Client });
		this.gmail = google.gmail({ version: "v1", auth: this.oAuth2Client });
	}

	async getCalendars() {
		return await this.calendar.calendarList.list();
	}

	async createCalendar(calendarName) {
		return await this.calendar.calendars.insert({
			requestBody: { summary: calendarName },
		});
	}

	async getCalendarEvents(calendarId) {
		return await this.calendar.events.list({ calendarId });
	}

	async createCalendarEvent(calendarId, event) {
		return await this.calendar.events.insert({
			calendarId,
			requestBody: event,
		});
	}

	async updateCalendarEvent(calendarId, eventId, event) {
		return await this.calendar.events.update({
			calendarId,
			eventId,
			requestBody: event,
		});
	}

	async sendEmailToSelf(email, subject, body) {
		const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString(
			"base64"
		)}?=`;
		const messageParts = [
			`From: ${email}`,
			`To: ${email}`,
			"Content-Type: text/html; charset=utf-8",
			"MIME-Version: 1.0",
			`Subject: ${utf8Subject}`,
			"",
			body,
		];
		const message = messageParts.join("\n");

		const encodedMessage = Buffer.from(message)
			.toString("base64")
			.replace(/\+/g, "-")
			.replace(/\//g, "_")
			.replace(/=+$/, "");

		const res = await this.gmail.users.messages.send({
			userId: email,
			requestBody: {
				raw: encodedMessage,
			},
		});

		return res;
	}
}

module.exports = GoogleAPISDK;
