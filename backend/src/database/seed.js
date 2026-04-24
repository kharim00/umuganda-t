require("dotenv").config();

const { createConfig } = require("../config/appConfig");
const { DemoDataService } = require("../services/demoDataService");

async function runSeed() {
  const config = createConfig(process.env);
  const dataService = new DemoDataService({
    filePath: config.demoDataFile
  });

  await dataService.init();
  await dataService.reset();

  console.log(`Demo data reset at ${config.demoDataFile}`);
}

runSeed().catch((error) => {
  console.error("Failed to seed demo data:", error);
  process.exit(1);
});
