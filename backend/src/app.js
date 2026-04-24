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

  app.use(express.static(config.frontendDir));
  app.use((req, res) => {
    if (req.path.startsWith("/api")) {
      res.status(404).json({ message: "Endpoint not found." });
      return;
    }

    res.sendFile(path.join(config.frontendDir, "index.html"));
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
