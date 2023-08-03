const express = require("express");
const router = express.Router();
const groupController = require("../controller/groupController");
const Authentication = require("../middleware/auth");

router.get("/getGroups", Authentication, groupController.getGroups);
router.get("/groupMembers/:groupName", Authentication, groupController.groupMembers);

router.post("/createGroup", Authentication, groupController.createGroup);
router.post("/addToGroup", Authentication, groupController.addToGroup);
router.post("/deleteFromGroup", Authentication, groupController.deleteFromGroup);

module.exports = router;