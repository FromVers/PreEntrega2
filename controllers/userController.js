const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Registro de usuario
exports.registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error("Error registrando usuario:", error);
    res.status(500).json({ error: "Ocurrió un error al registrar el usuario" });
  }
};

// Login de usuario
exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ message: "Login exitoso", user });
    });
  })(req, res, next);
};

// Obtener usuario actual (solo para JWT)
exports.getCurrentSessionUser = (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "No hay usuario en la sesión" });
  }
};
