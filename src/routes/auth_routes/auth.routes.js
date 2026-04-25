const express = require("express");
const authController = require("../../controllers/auth/auth.controller");
const verifyJWT = require('../../middleware/verifyToken');
const router = express.Router();

router.post("/post/login", authController.login);
router.get("/get/me", verifyJWT, authController.getUserLoggedIn);

module.exports = router;
