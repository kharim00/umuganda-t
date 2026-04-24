exports.getUsers = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    const users = await dataService.listUsers({
      role: req.query.role,
      status: req.query.status
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.updateApproval = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    const user = await dataService.updateApproval(
      req.params.id,
      req.body.status
    );
    res.json({
      message: `Account status updated to ${user.status}.`,
      user
    });
  } catch (error) {
    next(error);
  }
};

exports.updateRole = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    const user = await dataService.updateUserRole(req.params.id, req.body.role);
    res.json({
      message: "Role updated successfully.",
      user
    });
  } catch (error) {
    next(error);
  }
};

exports.updateLeaderPermissions = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    const user = await dataService.updateLeaderPermissions(
      req.params.id,
      req.body.canManageWork
    );
    res.json({
      message: "Leader work permissions updated successfully.",
      user
    });
  } catch (error) {
    next(error);
  }
};
