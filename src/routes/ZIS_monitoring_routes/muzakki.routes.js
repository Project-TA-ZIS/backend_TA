const muzakkiController = require("../../controllers/ZIS_monitoring_controllers/muzakki.controller");

const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/verifyToken");

router.get("/get/getAllMuzakki", muzakkiController.getAllMuzakki);
router.get(
  "/get/getMuzakkiById/:id",
  verifyJWT,
  muzakkiController.getMuzakkiById,
);
router.get(
  "/get/getMuzakkiByNik/:nik",
  muzakkiController.getMuzakkiByNik,
);
router.post("/post/createMuzakki", verifyJWT, muzakkiController.createMuzakki);
router.delete(
  "/delete/deleteMuzakki/:id",
  verifyJWT,
  muzakkiController.deleteMuzakki,
);
router.put("/put/editMuzakki/:id", verifyJWT, muzakkiController.editMuzakki);

module.exports = router;
