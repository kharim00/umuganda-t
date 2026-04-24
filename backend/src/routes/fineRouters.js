const express = require("express");

const fineController = require("../controller/fineController");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/my", auth, fineController.getFines);
router.put("/pay/:id", auth, fineController.payFine);

module.exports = router;
