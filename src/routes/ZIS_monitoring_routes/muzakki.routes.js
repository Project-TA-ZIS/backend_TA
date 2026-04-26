const muzakkiController = require("../../controllers/ZIS_monitoring_controllers/muzakki.controller");

const express = require("express");
const router = express.Router();

router.get("/get/getAllMuzakki", muzakkiController.getAllMuzakki);
router.get("/get/getMuzakkiById/:id", muzakkiController.getMuzakkiById);
router.post("/post/createMuzakki", muzakkiController.createMuzakki);
router.delete("/delete/deleteMuzakki/:id", muzakkiController.deleteMuzakki);

module.exports = router;
