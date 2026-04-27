const express = require("express");
const mustahikController = require("../../controllers/ZIS_monitoring_controllers/mustahik.controller");
const router = express.Router();

router.get("/get/getAllMustahik", mustahikController.getAllMustahik);
router.get("/get/getMustahik/:id", mustahikController.getMustahikById);
router.post("/post/createMustahik", mustahikController.createMustahik);
router.delete("/delete/deleteMustahik/:id", mustahikController.deleteMustahik);
router.put("/put/editMustahik/:id", mustahikController.editMustahik);

module.exports = router;