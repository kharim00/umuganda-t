const express = require("express");
const router = express.Router();

const adminController = require("../controller/adminController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Admin only
router.get("/stats", auth, role("admin"), adminController.getStats);

router.get("/report", auth, role("admin"), adminController.generateReport);

module.exports = router;