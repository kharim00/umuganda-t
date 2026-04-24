const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.headers.authorization || "";

  if (!header.startsWith("Bearer ")) {
    const error = new Error("No token provided.");
    error.statusCode = 401;
    next(error);
    return;
  }

  try {
    const config = req.app.locals.config;
    const dataService = req.app.locals.dataService;
    const decoded = jwt.verify(header.slice(7), config.jwtSecret);
    const user = dataService.getUserById(decoded.id);

    if (!user || user.status !== "approved") {
      const error = new Error("Your session is no longer valid.");
      error.statusCode = 401;
      next(error);
      return;
    }

    req.currentUser = dataService.sanitizeUser(user);
    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};
