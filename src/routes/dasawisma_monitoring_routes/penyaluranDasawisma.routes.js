const express = require("express");
const pengeluaranDasawismaControllers = require("../../controllers/dasawisma_monitoring_controllers/penyaluranDasawisma.controller");
const router = express.Router();

router.get(
  "/get/getAllPengeluaran",
  pengeluaranDasawismaControllers.getAllPengeluaranDasawisma,
);
router.get(
  "/get/getPengeluaran/:id",
  pengeluaranDasawismaControllers.getPengeluaranDasawismaById,
);
router.post(
  "/post/createPengeluaran",
  pengeluaranDasawismaControllers.addPengeluaranDasawisma,
);
router.put(
  "/update/updatePengeluaran/:id",
  pengeluaranDasawismaControllers.updatePengeluaranDasawisma,
);

module.exports = router;
