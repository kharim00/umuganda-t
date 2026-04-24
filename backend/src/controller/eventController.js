exports.createEvent = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    const eventItem = await dataService.createEvent({
      title: req.body.title,
      date: req.body.date,
      location: req.body.location,
      description: req.body.description,
      createdBy: req.currentUser.id
    });

    res.status(201).json({
      message: "Event created successfully.",
      event: eventItem
    });
  } catch (error) {
    next(error);
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    const eventItem = await dataService.updateEvent(req.params.id, req.body);
    res.json({
      message: "Event updated successfully.",
      event: eventItem
    });
  } catch (error) {
    next(error);
  }
};

exports.getEvents = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    res.json(await dataService.listEvents());
  } catch (error) {
    next(error);
  }
};

exports.sendReminder = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    const result = await dataService.sendReminder(req.body.eventId);
    res.json({
      message: `Reminder sent to ${result.recipients} participants.`,
      ...result
    });
  } catch (error) {
    next(error);
  }
};
