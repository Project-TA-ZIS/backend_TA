const express = require("express");
const mustahikController = require("../../controllers/ZIS_monitoring_controllers/mustahik.controller");
const router = express.Router();

router.get("/get/getAllMustahik", mustahikController.getAllMustahik);
router.get("/get/getMustahik/:id", mustahikController.getMustahikById);
router.post("/post/createMustahik", mustahikController.createMustahik);
router.delete("/delete/deleteMustahik/:id", mustahikController.deleteMustahik);

module.exports = router;