const express = require("express");
const totalKasDasawismaControllers = require("../../controllers/dasawisma_monitoring_controllers/totalKasDasawisma.controller");
const router = express.Router();

router.get("/get/getTotalKasDasawisma", totalKasDasawismaControllers.getTotalKasDasawisma);
router.get("/get/getTotalKasDasawismaByRW", totalKasDasawismaControllers.getTotalKasDasawismaByRWid);

module.exports = router;