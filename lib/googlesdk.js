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
}

module.exports = GoogleAPISDK;
