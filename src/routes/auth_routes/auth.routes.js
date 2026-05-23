const express = require("express");
const authController = require("../../controllers/auth/auth.controller");
const verifyJWT = require("../../middleware/verifyToken");
const router = express.Router();

router.post("/post/login", authController.login);
router.get("/get/me", verifyJWT, authController.getUserLoggedIn);
router.post("/post/forgot-password", authController.requestPasswordReset);
router.post("/post/reset-password", authController.resetPassword);

module.exports = router;
