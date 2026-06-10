const express = require("express");
const dasawismaController = require("../../controllers/dasawisma_monitoring_controllers/anggotaDasawisma.controller");
const router = express.Router();

router.get("/get/getAllAnggota", dasawismaController.getAllAnggotaDasawisma);
router.get("/get/getAnggota/:id", dasawismaController.getAnggotaDasawismaById);
router.post("/post/createAnggota", dasawismaController.createAnggotaDasawisma);
router.delete("/delete/deleteAnggota/:id", dasawismaController.deleteAnggotaDasawisma);
router.put("/update/updateProfile/:id", dasawismaController.updateProfileAnggota);
router.put("/update/updateAnggotaByPJ/:id", dasawismaController.updateAnggotaByPJ);
router.put("/update/updatePassword", dasawismaController.updatePassword);


module.exports = router;

