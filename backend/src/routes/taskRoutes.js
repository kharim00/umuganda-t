const express = require("express");
const router = express.Router();

const taskController = require("../controller/taskController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Assign task → leader/admin only
router.post("/", auth, role("leader", "admin"), taskController.assignTask);

// Citizen → get own tasks
router.get("/my", auth, role("citizen"), taskController.getMyTasks);

// Leader → view tasks by event
router.get("/event/:eventId", auth, role("leader", "admin"), taskController.getTasksByEvent);

module.exports = router;
