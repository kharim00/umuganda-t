exports.setCollectionGoal = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    const payments = await dataService.setCollectionGoal(req.body.amount);
    res.json({
      message: "Collection goal updated successfully.",
      payments
    });
  } catch (error) {
    next(error);
  }
};

exports.depositContribution = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    const result = await dataService.depositContribution({
      userId: req.currentUser.id,
      amount: req.body.amount
    });
    res.json({
      message: "Contribution deposited successfully.",
      ...result
    });
  } catch (error) {
    next(error);
  }
};

exports.getPayments = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    res.json(dataService.getPaymentsSummary(req.currentUser.id));
  } catch (error) {
    next(error);
  }
};
