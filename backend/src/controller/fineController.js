const Fine = require("../database/models/fineModel");

// Get fines
exports.getFines = async (req, res) => {
  const fines = await Fine.findAll({
    where: { user_id: req.user.id },
  });

  res.json(fines);
};

// Pay fine
exports.payFine = async (req, res) => {
  const { id } = req.params;

  const fine = await Fine.findByPk(id);
  fine.status = "paid";
  await fine.save();

  res.json({ message: "Fine paid" });
};