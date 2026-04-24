const QRCode = require("qrcode");

exports.markAttendance = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    const attendance = await dataService.markAttendance({
      userId: req.currentUser.id,
      eventId: req.body.eventId || req.body.event_id,
      status: req.body.status,
      qrData: req.body.qrData
    });

    res.json({
      message: "Attendance marked successfully.",
      attendance
    });
  } catch (error) {
    next(error);
  }
};

exports.generateFines = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    const result = await dataService.generateFines(req.body.eventId || req.body.event_id);
    res.json({
      message: `${result.generated} fines generated for absentees.`,
      ...result
    });
  } catch (error) {
    next(error);
  }
};

exports.generateQR = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const data = `umuganda:event:${eventId}`;
    const qrImage = await QRCode.toDataURL(data);
    res.json({ data, qrImage });
  } catch (error) {
    next(error);
  }
};
