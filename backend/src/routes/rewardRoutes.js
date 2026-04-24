const express = require("express");

const rewardController = require("../controller/rewardController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/leaderboard", auth, rewardController.getLeaderboard);

module.exports = router;
