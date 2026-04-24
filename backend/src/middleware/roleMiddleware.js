module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.currentUser) {
      const error = new Error("You must be logged in first.");
      error.statusCode = 401;
      next(error);
      return;
    }

    if (!allowedRoles.includes(req.currentUser.role)) {
      const error = new Error("Access denied.");
      error.statusCode = 403;
      next(error);
      return;
    }

    next();
  };
};
