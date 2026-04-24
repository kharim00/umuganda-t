const express = require("express");

const attendanceController = require("../controller/attendanceController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/mark", auth, role("citizen"), attendanceController.markAttendance);
router.post(
  "/generate-fines",
  auth,
  role("leader", "admin"),
  attendanceController.generateFines
);
router.get("/qr/:eventId", auth, role("leader", "admin"), attendanceController.generateQR);

module.exports = router;
