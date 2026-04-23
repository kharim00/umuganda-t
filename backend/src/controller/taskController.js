const Task = require("../database/models/taskModel");

// ✅ Assign Task (Manager/Admin)
exports.assignTask = async (req, res) => {
  try {
    const { event_id, assigned_to, description, zone } = req.body;

    const task = await Task.create({
      event_id,
      assigned_to,
      description,
      zone,
    });

    res.status(201).json({
      message: "Task assigned successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Tasks for Logged-in User (Citizen)
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { assigned_to: req.user.id },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Tasks by Event (Manager view)
exports.getTasksByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const tasks = await Task.findAll({
      where: { event_id: eventId },
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};