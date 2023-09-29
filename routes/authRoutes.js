const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Rutas para la recuperación de contraseña
router.post("/forgot-password", authController.sendPasswordResetEmail);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
