exports.getFines = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    res.json(await dataService.listFinesForUser(req.currentUser.id));
  } catch (error) {
    next(error);
  }
};

exports.payFine = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    const fine = await dataService.payFine(req.params.id, req.currentUser);
    res.json({
      message: "Fine paid successfully.",
      fine
    });
  } catch (error) {
    next(error);
  }
};
