const express = require("express");

const authController = require("../controller/authController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot-password", authController.forgotPassword);
router.get("/session", auth, authController.getSession);

module.exports = router;
