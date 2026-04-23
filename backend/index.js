require("dotenv").config();
const express = require("express");
const { sequelize } = require("./src/config/DB.js");

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use('/', require('./src/routes/index.js'));

app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

sequelize.authenticate()
  .then(() => {
    console.log("Database connection established successfully");

    return sequelize.sync(); // safe mode
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📊 Database is connected and synced`);
      console.log(`📋 API Documentation available at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });


  console.log("JWT:", process.env.JWT_SECRET);
