const express = require("express");

const userController = require("../controller/userController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", auth, role("admin"), userController.getUsers);
router.patch("/:id/approval", auth, role("admin"), userController.updateApproval);
router.patch(
  "/:id/permissions",
  auth,
  role("admin"),
  userController.updateLeaderPermissions
);
router.put("/:id/role", auth, role("admin"), userController.updateRole);

module.exports = router;
