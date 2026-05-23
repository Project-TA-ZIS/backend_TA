const express = require("express");
const mustahikController = require("../../controllers/ZIS_monitoring_controllers/mustahik.controller");
const router = express.Router();
const verifyJWT = require("../../middleware/verifyToken");

router.get("/get/getAllMustahik", mustahikController.getAllMustahik);
router.get(
  "/get/getMustahik/:id",
  verifyJWT,
  mustahikController.getMustahikById,
);
router.post(
  "/post/createMustahik",
  verifyJWT,
  mustahikController.createMustahik,
);
router.delete(
  "/delete/deleteMustahik/:id",
  verifyJWT,
  mustahikController.deleteMustahik,
);
router.put("/put/editMustahik/:id", verifyJWT, mustahikController.editMustahik);

module.exports = router;
