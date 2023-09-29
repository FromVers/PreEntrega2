const { isAdmin, isUser } = require("../utils/roles"); // Importa funciones para verificar roles

// Middleware para verificar si el usuario es administrador
function checkAdmin(req, res, next) {
  if (isAdmin(req.user)) {
    // Si el usuario es administrador, permite que continúe
    next();
  } else {
    // Si el usuario no es administrador, responde con un error de autorización
    res.status(403).json({ error: "Acceso no autorizado" });
  }
}

// Middleware para verificar si el usuario es usuario normal
function checkUser(req, res, next) {
  if (isUser(req.user)) {
    // Si el usuario es usuario normal, permite que continúe
    next();
  } else {
    // Si el usuario no es usuario normal, responde con un error de autorización
    res.status(403).json({ error: "Acceso no autorizado" });
  }
}

module.exports = { checkAdmin, checkUser };
