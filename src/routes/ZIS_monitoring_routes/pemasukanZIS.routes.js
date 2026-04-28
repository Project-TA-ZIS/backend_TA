const express = require("express");
const router = express.Router();
const pemasukanZISController = require("../../controllers/ZIS_monitoring_controllers/pemasukanZIS.controller");
const verifyJWT = require("../../middleware/verifyToken");

router.get(
  "/get/getAllPemasukanZIS",
  pemasukanZISController.getAllPemasukanZIS,
);
router.get(
  "/get/getPemasukanZISById/:id",
  pemasukanZISController.getPemasukanZISById,
);
router.post(
  "/add/addPemasukanZIS",
  verifyJWT,
  pemasukanZISController.addPemasukanZIS,
);
router.put(
  "/update/updatePemasukanZIS/:id",
  verifyJWT,
  pemasukanZISController.updatePemasukanZIS,
);
router.delete(
  "/delete/deletePemasukanZIS/:id",
  verifyJWT,
  pemasukanZISController.deletePemasukanZIS,
);

module.exports = router;