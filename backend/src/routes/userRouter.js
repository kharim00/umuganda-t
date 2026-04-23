const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Admin only
router.get("/", auth, role("admin"), userController.getUsers);

// Promote user
router.put("/:id/role", auth, role("admin"), userController.updateRole);

module.exports = router;