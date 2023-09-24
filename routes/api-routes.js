var express = require("express");
const { usersMe } = require("../controllers/user-controller");
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
router.post("/users/me", usersMe);

// define the route for 404 errors
router.get("*", function (req, res) {
	res.status(404).json({
		error: "404",
		message: "The requested resource could not be found.",
	});
});

module.exports = router;
