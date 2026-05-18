const express = require("express");
const pemasukanDasawismaController = require("../../controllers/dasawisma_monitoring_controllers/pemasukanDasawisma.controller");
const router = express.Router();

router.get("/get/getAllPemasukan", pemasukanDasawismaController.getAllPemasukanDasawisma);
router.get("/get/getPemasukan/:id", pemasukanDasawismaController.getPemasukanDasawismaById);
router.post("/post/createPemasukan", pemasukanDasawismaController.addPemasukanDasawisma);
router.put("/update/updatePemasukan/:id", pemasukanDasawismaController.updatePemasukanDasawisma);

module.exports = router;