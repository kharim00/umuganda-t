const Event = require("../database/models/eventModel");

// ✅ Create Event (Manager/Admin only)
exports.createEvent = async (req, res) => {
  try {
    const { title, date, location } = req.body;

    const event = await Event.create({
      title,
      date,
      location,
      created_by: req.user.id,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      order: [["date", "DESC"]],
    });

    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};