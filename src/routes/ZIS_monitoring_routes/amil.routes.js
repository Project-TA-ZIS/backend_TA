const express = require("express");
const amilController = require("../../controllers/ZIS_monitoring_controllers/amil.controller");
const router = express.Router();

router.get("/get/getAllAmil", amilController.getAllAmil);
router.get("/get/getAmil/:id", amilController.getAmilById);
router.post("/post/createAmil", amilController.createAmil);
router.delete("/delete/deleteAmil/:id", amilController.deleteAmil);

module.exports = router;
