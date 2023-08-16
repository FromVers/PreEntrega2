const express = require("express");
const passport = require("passport");
const router = express.Router();

// Ruta para login con Passport (estrategia local)
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json(req.user);
});

// Ruta para obtener el usuario actual con JWT (estrategia JWT)
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
