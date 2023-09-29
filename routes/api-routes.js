var express = require("express");
const { getUsersMe, putUsersMe } = require("../controllers/user-controller");
const { getDashboard } = require("../controllers/dashboard-controller");
const { getTasks, createTask, updateTask, deleteTask } = require("../controllers/task-controller");
const { getProjects, createProject, updateProject, deleteProject } = require("../controllers/project-controller");
const { getLabels } = require("../controllers/label-controller");
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

// route for tasks
router.get("/tasks", getTasks);
router.post("/tasks", createTask);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

// route for projects
router.get("/projects", getProjects);
router.post("/projects", createProject);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

// route for labels
router.get("/labels", getLabels);

// define the route for 404 errors
router.get("*", function (req, res) {
	res.status(404).json({
		error: "404",
		message: "The requested resource could not be found.",
	});
});

module.exports = router;
