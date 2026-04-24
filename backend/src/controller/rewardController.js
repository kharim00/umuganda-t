exports.getLeaderboard = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    res.json(await dataService.getLeaderboard());
  } catch (error) {
    next(error);
  }
};
