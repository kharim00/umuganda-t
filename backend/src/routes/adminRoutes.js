const express = require("express");

const adminController = require("../controller/adminController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/stats", auth, role("admin"), adminController.getStats);
router.get("/report", auth, role("admin"), adminController.generateReport);

module.exports = router;
