const Attendance = require("../database/models/attendanceModel");
const QRCode = require('qrcode');
const User = require("../database/models/userModel");
const Fine = require("../database/models/fineModel");
const Reward = require("../database/models/rewardModel");

// Mark attendance (Citizen - QR or manual)
exports.markAttendance = async (req, res) => {
  try {
    const { event_id, status = "present", qrData } = req.body;
    
    // QR verify (optional)
    if (qrData) {
      const expectedQR = `umuganda:event:${event_id}`;
      if (qrData !== expectedQR) {
        return res.status(400).json({ error: "Invalid QR code" });
      }
    }

    // Check duplicate
    const existing = await Attendance.findOne({ where: { user_id: req.user.id, event_id } });
    if (existing) {
      return res.status(400).json({ error: "Attendance already marked" });
    }

    const attendance = await Attendance.create({
      user_id: req.user.id,
      event_id,
      status
    });

    // Reward/Fine logic
    if (status === "present") {
      const reward = await Reward.findOrCreate({
        where: { user_id: req.user.id },
        defaults: { user_id: req.user.id, points: 10 }
      });
      await reward[0].increment('points', { by: 10 });
      res.json({ message: "Attendance marked + 10 points!", attendance });
    } else {
      await Fine.create({
        user_id: req.user.id,
        event_id,
        amount: 5000,
        status: "pending",
        reason: "Absent from Umuganda"
      });
      res.json({ message: "Absent marked - Fine generated", attendance });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Generate fines for event absentees (Leader/Admin)
exports.generateFines = async (req, res) => {
  try {
    const { event_id } = req.body;
    
    // Get attendees
    const attendances = await Attendance.findAll({ where: { event_id, status: "present" } });
    const attendees = attendances.map(a => a.user_id);
    
    // All citizens for event (assume from tasks or users)
    const users = await User.findAll({ where: { role: "citizen" } });
    const absentees = users.filter(u => !attendees.includes(u.id));

    let count = 0;
    for (const user of absentees) {
      await Fine.findOrCreate({
        where: { user_id: user.id, event_id },
        defaults: {
          user_id: user.id,
          event_id,
          amount: 5000,
          status: "pending",
          reason: "Absent from Umuganda"
        }
      });
      count++;
    }

    res.json({ message: `${count} fines generated for absentees` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Generate QR code for event (Leader prints)
exports.generateQR = async (req, res) => {
  try {
    const { eventId } = req.params;
    const qrData = `umuganda:event:${eventId}`;
    const qrImage = await QRCode.toDataURL(qrData);
    res.json({ qrImage, data: qrData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Stats (Admin - participation, low areas)
exports.getStats = async (req, res) => {
  try {
    const totalEvents = await Attendance.count({ col: 'event_id', distinct: true });
    const totalAttendance = await Attendance.count();
    const present = await Attendance.count({ where: { status: "present" } });

    // Low participation events
    const lowEvents = await Attendance.findAll({
      attributes: ['event_id', [sequelize.fn('count', sequelize.col('id')), 'total']],
      where: { status: "present" },
      group: 'event_id',
      having: sequelize.where(sequelize.fn('count', sequelize.col('id')), '<=', 5) // arbitrary low
    });

    res.json({
      totalEvents,
      totalAttendance,
      present,
      percentage: totalAttendance > 0 ? (present / totalAttendance) * 100 : 0,
      lowParticipationEvents: lowEvents
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
