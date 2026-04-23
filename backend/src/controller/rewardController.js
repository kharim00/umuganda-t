const Reward = require("../database/models/rewardModel");

exports.getLeaderboard = async (req, res) => {
  const rewards = await Reward.findAll({
    order: [["points", "DESC"]],
  });

  res.json(rewards);
};