const express = require("express");
const dasawismaController = require("../../controllers/dasawisma_monitoring_controllers/anggotaDasawisma.controller");
const router = express.Router();

router.get("/get/getAllAnggota", dasawismaController.getAllAnggotaDasawisma);
router.get("/get/getAnggota/:id", dasawismaController.getAnggotaDasawismaById);
router.post("/post/createAnggota", dasawismaController.createAnggotaDasawisma);
router.delete("/delete/deleteAnggota/:id", dasawismaController.deleteAnggotaDasawisma);


module.exports = router;

