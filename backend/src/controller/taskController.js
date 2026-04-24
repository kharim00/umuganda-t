exports.assignTask = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    const task = await dataService.createTask({
      eventId: req.body.eventId || req.body.event_id,
      assignedTo: req.body.assignedTo || req.body.assigned_to,
      description: req.body.description,
      zone: req.body.zone,
      createdBy: req.currentUser.id
    });

    res.status(201).json({
      message: "Task assigned successfully.",
      task
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    const task = await dataService.updateTask(req.params.id, req.body);
    res.json({
      message: "Task updated successfully.",
      task
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTaskStatus = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    const task = await dataService.updateTaskStatus(req.params.id, req.body.status);
    res.json({
      message: "Task status updated successfully.",
      task
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyTasks = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    const userId = req.currentUser.role === "citizen" ? req.currentUser.id : undefined;
    res.json(await dataService.listTasks({ userId }));
  } catch (error) {
    next(error);
  }
};

exports.getTasksByEvent = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    res.json(await dataService.listTasks({ eventId: req.params.eventId }));
  } catch (error) {
    next(error);
  }
};
