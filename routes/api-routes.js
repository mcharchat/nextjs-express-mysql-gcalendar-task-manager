var express = require("express");
const { getUsersMe, putUsersMe } = require("../controllers/user-controller");
const { getDashboard } = require("../controllers/dashboard-controller");
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	next();
});
// define the home page route
router.get("/", function (req, res) {
	res.json();
});
// route for users/me
router.get("/users/me", getUsersMe);
router.put("/users/me", putUsersMe);

// route for dashboard data
router.get("/dashboard", getDashboard);

// define the route for 404 errors
router.get("*", function (req, res) {
	res.status(404).json({
		error: "404",
		message: "The requested resource could not be found.",
	});
});

module.exports = router;
