const express = require("express");
const path = require("node:path");

const routes = require("./routes");

function createApp({ config, dataService }) {
  const app = express();

  app.locals.config = config;
  app.locals.dataService = dataService;

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");

    if (req.method === "OPTIONS") {
      res.sendStatus(204);
      return;
    }

    next();
  });

  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: false }));

  app.use("/api", routes);

  // Serve static files only if frontend directory exists
  const frontendDir = config.frontendDir;
  const frontendExists = require("fs").existsSync(frontendDir);
  if (frontendExists) {
    app.use(express.static(frontendDir));
  }

  // Fallback route - serve API 404 or frontend index
  app.use((req, res) => {
    if (req.path.startsWith("/api")) {
      res.status(404).json({ message: "Endpoint not found." });
      return;
    }

    if (frontendExists) {
      const indexPath = path.join(frontendDir, "index.html");
      if (require("fs").existsSync(indexPath)) {
        res.sendFile(indexPath);
        return;
      }
    }

    res.status(200).json({
      message: "Umuganda-T API is running",
      endpoints: "/api/users, /api/tasks, /api/events, /api/rewards, /api/fines, /api/attendance"
    });
  });

  app.use((error, req, res, next) => {
    if (res.headersSent) {
      next(error);
      return;
    }

    res.status(error.statusCode || 500).json({
      message: error.message || "Unexpected server error."
    });
  });

  return app;
}

module.exports = {
  createApp
};
