const express = require("express");

const taskController = require("../controller/taskController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", auth, role("leader", "admin"), taskController.assignTask);
router.get("/my", auth, taskController.getMyTasks);
router.get("/event/:eventId", auth, role("leader", "admin"), taskController.getTasksByEvent);
router.put("/:id", auth, role("leader", "admin"), taskController.updateTask);
router.patch("/:id/status", auth, taskController.updateTaskStatus);

module.exports = router;
