require("dotenv").config();

const { createApp } = require("./src/app");
const { createConfig } = require("./src/config/appConfig");
const { DemoDataService } = require("./src/services/demoDataService");

async function startServer() {
  try {
    // Load config (IMPORTANT: includes process.env.PORT for Render)
    const config = createConfig(process.env);

    // Initialize demo data service
    const dataService = new DemoDataService({
      filePath: config.demoDataFile
    });

    await dataService.init();

    // Create Express app
    const app = createApp({
      config,
      dataService
    });

    // Start server (Render-safe)
    const server = app.listen(config.port, () => {
      const baseUrl =
        process.env.NODE_ENV === "production"
          ? "Production server running"
          : `http://localhost:${config.port}`;

      console.log(`Umuganda-T app running on ${baseUrl}`);
      console.log(`Mode: ${config.dataMode}`);
    });

    return { app, server, dataService, config };
  } catch (error) {
    console.error("❌ Unable to start Umuganda-T:", error);
    process.exit(1);
  }
}

// Only run server if this file is executed directly
if (require.main === module) {
  startServer();
}

module.exports = {
  startServer
};