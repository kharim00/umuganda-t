const Attendance = require("../database/models/attendanceModel");
const Event = require("../database/models/eventModel");
const Fine = require("../database/models/fineModel");

// Government Dashboard Stats
exports.getStats = async (req, res) => {
  try {
    const stats = await Attendance.findAll({
      attributes: [
        'event_id',
        [sequelize.fn('count', sequelize.col('*')), 'total'],
        [sequelize.fn('sum', sequelize.literal('CASE WHEN status = "present" THEN 1 ELSE 0 END')), 'present']
      ],
      include: [{
        model: Event,
        attributes: ['location', 'date']
      }],
      group: ['Attendance.event_id', 'Event.id'],
      order: sequelize.literal('present / total ASC')
    });

    const lowParticipation = stats.filter(s => (s.dataValues.present / s.dataValues.total) < 0.5);

    res.json({
      overallParticipation: stats,
      lowParticipationAreas: lowParticipation,
      totalFines: await Fine.count()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Generate Report (JSON/CSV)
exports.generateReport = async (req, res) => {
  const { year } = req.query;
  const reports = await Attendance.findAll({
    include: [User, Event],
    where: { createdAt: { [Op.gte]: `${year}-01-01` } }
  });
  res.json(reports);
};
