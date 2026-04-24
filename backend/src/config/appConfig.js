const path = require("node:path");

function createConfig(env = process.env) {
  return {
    port: Number(env.PORT) || 7000,

    jwtSecret: env.JWT_SECRET || "umuganda-demo-secret",

    // ✅ FIX: allow environment override
    dataMode: env.DATA_MODE || "demo-json",

    // ⚠️ Keep frontend path only for local dev (optional use)
    frontendDir: path.resolve(__dirname, "..", "..", "..", "umugandapro"),

    demoDataFile:
      env.DEMO_DATA_FILE ||
      path.resolve(__dirname, "..", "..", "data", "demo-data.json"),

    // ⚠️ safer handling for API key
    openAiApiKey: env.OPENAI_API_KEY || null,

    openAiTranslationModel:
      env.OPENAI_TRANSLATION_MODEL || "gpt-5.4-mini"
  };
}

module.exports = {
  createConfig
};