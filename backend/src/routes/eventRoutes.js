const express = require("express");
const router = express.Router();

const eventController = require("../controller/eventController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Create event → only leader/admin
router.post("/", auth, role("leader", "admin"), eventController.createEvent);

// Get events → everyone logged in
router.get("/", auth, eventController.getEvents);

module.exports = router;
