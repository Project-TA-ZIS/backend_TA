const express = require("express");
const router = express.Router();
const pengeluaranZISController = require("../../controllers/ZIS_monitoring_controllers/penyaluranZIS.controller");
const verifyJWT = require("../../middleware/verifyToken");

router.get(
  "/get/getAllPengeluaranZIS",
  pengeluaranZISController.getAllPengeluaranZIS,
);
router.get(
  "/get/getPengeluaranZISById/:id",
  pengeluaranZISController.getPengeluaranZISById,
);
router.post(
  "/add/addPengeluaranZIS",
  verifyJWT,
  pengeluaranZISController.addPengeluaranZIS,
);
router.put(
  "/update/updatePengeluaranZIS/:id",
  verifyJWT,
  pengeluaranZISController.updatePengeluaranZIS,
);

module.exports = router;