const express = require("express");
const totalZISController = require("../../controllers/ZIS_monitoring_controllers/totalZIS.controller");
const router = express.Router();

router.get(
  "/get/getTotalZISByKategori",
  totalZISController.getTotalZISByKategori,
);
router.get(
  "/get/getTotalAllPemasukanZIS",
  totalZISController.getTotalAllPemasukanZIS,
);

module.exports = router;
