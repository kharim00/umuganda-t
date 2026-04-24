const express = require("express");

const appController = require("../controller/appController");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRouter");
const eventRoutes = require("./eventRoutes");
const taskRoutes = require("./taskRoutes");
const attendanceRoutes = require("./attendanceRoutes");
const fineRoutes = require("./fineRouters");
const rewardRoutes = require("./rewardRoutes");
const adminRoutes = require("./adminRoutes");
const paymentRoutes = require("./paymentRoutes");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", appController.getHealth);
router.get("/health", appController.getHealth);
router.get("/bootstrap", appController.getBootstrap);
router.get("/dashboard", auth, appController.getDashboard);
router.post("/feedback", appController.submitFeedback);
router.post("/contact", appController.submitContact);
router.post("/translate", appController.translate);

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/events", eventRoutes);
router.use("/tasks", taskRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/fines", fineRoutes);
router.use("/rewards", rewardRoutes);
router.use("/admin", adminRoutes);
router.use("/payments", paymentRoutes);

module.exports = router;
