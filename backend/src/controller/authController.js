const jwt = require("jsonwebtoken");

function toPublicUser(user) {
  return {
    ...user,
    role: user.role
  };
}

exports.login = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    const config = req.app.locals.config;

    const user = await dataService.login({
      identifier: req.body.phone || req.body.email || req.body.identifier,
      password: req.body.password,
      role: req.body.role
    });

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      config.jwtSecret,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful.",
      token,
      user: toPublicUser(user),
      dashboard: await dataService.getDashboard(user)
    });
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    const { user, approvalRequired } = await dataService.registerUser({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      role: req.body.role,
      village: req.body.village
    });

    res.status(201).json({
      message: approvalRequired
        ? "Registration submitted. Wait for admin approval before login."
        : "User registered successfully.",
      approvalRequired,
      user: toPublicUser(user)
    });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;
    const result = await dataService.submitForgotPassword({
      identifier: req.body.identifier
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.getSession = async (req, res, next) => {
  try {
    const dataService = req.app.locals.dataService;

    res.json({
      user: toPublicUser(req.currentUser),
      dashboard: await dataService.getDashboard(req.currentUser)
    });
  } catch (error) {
    next(error);
  }
};
