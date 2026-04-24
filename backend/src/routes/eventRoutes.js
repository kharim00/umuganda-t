const express = require("express");

const eventController = require("../controller/eventController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", eventController.getEvents);
router.post("/", auth, role("leader", "admin"), eventController.createEvent);
router.put("/:id", auth, role("leader", "admin"), eventController.updateEvent);
router.post("/reminders", auth, role("leader", "admin"), eventController.sendReminder);

module.exports = router;
