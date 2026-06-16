const rwController = require("../../controllers/rw/rw.controller");
const express = require("express");
const router = express.Router();

router.get("/get/getAllRW", rwController.getAllRW);
router.get("/get/getRWById/:id", rwController.getRWById);
router.post("/post/createRW", rwController.createRW);
router.delete("/delete/deleteRW/:id", rwController.deleteRW);


module.exports = router;