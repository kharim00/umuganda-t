const express = require("express");
const router = express.Router();

const fineController = require("../controller/fineController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// Citizen views own fines
router.get("/my", auth, fineController.getFines);


// Pay fine
router.put("/pay/:id", auth, fineController.payFine);

module.exports = router;