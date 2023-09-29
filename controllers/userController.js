const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const User = require("../models/User");

// Cambiar el rol de un usuario (premium/user)
exports.changeUserRole = async (req, res) => {
  const userId = req.params.uid;
  const newRole = req.body.role; // El nuevo rol ("premium" o "user")

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (newRole !== "premium" && newRole !== "user") {
      return res.status(400).json({ message: "Rol no válido" });
    }

    // Actualizar el rol del usuario
    user.role = newRole;
    await user.save();

    res
      .status(200)
      .json({ message: `Rol de usuario actualizado a ${newRole}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
