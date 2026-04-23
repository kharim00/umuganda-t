const User = require("../database/models/userModel");

// Get all users (Admin)
exports.getUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

// Promote user
exports.updateRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const user = await User.findByPk(id);
  user.role = role;
  await user.save();

  res.json({ message: "Role updated", user });
};