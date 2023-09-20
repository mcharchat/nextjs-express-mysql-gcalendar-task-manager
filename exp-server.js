const express = require("express");
const next = require("next");
const helmet = require("helmet");
const apiRoutes = require("./routes/api-routes");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

app
	.prepare()
	.then(() => {
		const server = express();

		server.use(helmet());

		// when a request comes to /api/auth/*, redirect to next.js,
		server.all("/api/auth/*", (req, res) => {
			return handle(req, res);
		});

		//when a request comes to /api/*, redirect to api-routes on express
		server.use("/api", apiRoutes);

		//the rest of the requests are handled by next.js
		server.all("*", (req, res) => {
			return handle(req, res);
		});

		server.listen(PORT, (err) => {
			if (err) throw err;
			console.log(`> Ready on http://localhost:${PORT}`);
		});
	})
	.catch((ex) => {
		console.error(ex.stack);
		process.exit(1);
	});
