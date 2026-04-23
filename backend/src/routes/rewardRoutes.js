const express = require("express");
const router = express.Router();

const rewardController = require("../controller/rewardController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Leaderboard
router.get("/leaderboard", auth, role("citizen", "leader", "admin"), rewardController.getLeaderboard);


module.exports = router;