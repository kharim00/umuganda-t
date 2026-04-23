const express = require("express");
const router = express.Router();

const attendanceController = require("../controller/attendanceController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Citizen marks attendance
router.post("/mark", auth, role("citizen"), attendanceController.markAttendance);

// Leader/Admin generate fines
router.post("/generate-fines", auth, role("leader", "admin"), attendanceController.generateFines);

// Get QR for event (Leader prints/shows)
router.get("/qr/:eventId", auth, role("leader", "admin"), attendanceController.generateQR);

module.exports = router;
