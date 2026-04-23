const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const userRoutes = require("./userRouter");
const eventRoutes = require("./eventRoutes");
const taskRoutes = require("./taskRoutes");
const attendanceRoutes = require("./attendanceRoutes");
const fineRoutes = require("./fineRouters");
const rewardRoutes = require("./rewardRoutes");
const adminRoutes = require("./adminRoutes");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/events", eventRoutes);
router.use("/tasks", taskRoutes);
router.use("/attendance", attendanceRoutes);
router.use("/fines", fineRoutes);
router.use("/rewards", rewardRoutes);
router.use("/admin", adminRoutes);

module.exports = router;