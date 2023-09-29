const winston = require("winston");

// Configuración de los niveles de log
const logLevels = {
  debug: 0,
  http: 1,
  info: 2,
  warning: 3,
  error: 4,
  fatal: 5,
};

// Configuración de los colores para los niveles de log
const logColors = {
  debug: "blue",
  http: "green",
  info: "cyan",
  warning: "yellow",
  error: "red",
  fatal: "magenta",
};

// Crear un logger de Winston
const logger = winston.createLogger({
  levels: logLevels,
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "errors.log", level: "error" }),
  ],
});

// Establecer colores para los niveles de log
winston.addColors(logColors);

module.exports = logger;
