exports.getStats = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    res.json(await dataService.getAdminStats());
  } catch (error) {
    next(error);
  }
};

exports.generateReport = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    res.json(await dataService.getReport(req.query.year));
  } catch (error) {
    next(error);
  }
};
