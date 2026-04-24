const express = require("express");

const paymentController = require("../controller/paymentController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/summary", auth, paymentController.getPayments);
router.post("/goal", auth, role("leader", "admin"), paymentController.setCollectionGoal);
router.post("/deposit", auth, role("citizen"), paymentController.depositContribution);

module.exports = router;
