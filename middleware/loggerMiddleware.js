const logger = require("../utils/logger");

// Middleware para el registro de logs de solicitudes
function loggerMiddleware(req, res, next) {
  const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url}`;
  logger.info(logMessage); // Registra la solicitud en nivel 'info'
  next();
}

module.exports = loggerMiddleware;
