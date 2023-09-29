const express = require("express");
const session = require("express-session");
const passport = require("./config/passportConfig");
const path = require("path");
const productController = require("./controllers/productController");
const cartsController = require("./controllers/cartsController");
const dbConfig = require("./config/dbConfig");
const sessionsRoutes = require("./routes/sessionRoutes");
const roles = require("./utils/roles");
const winston = require("winston");
const { createLogger, format, transports } = winston;

// Logger para desarrollo
const developmentLogger = createLogger({
  level: "debug",
  format: format.combine(format.colorize(), format.simple()),
  transports: [new transports.Console()],
});

// Logger para producción
const productionLogger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
      level: "error",
    }),
  ],
});

// Determinar qué logger usar según el entorno
const logger =
  process.env.NODE_ENV === "production" ? productionLogger : developmentLogger;

const app = express();
const port = 8080;

// Configurar la sesión
app.use(
  session({
    secret: "ClaveClave", // clave
    resave: false,
    saveUninitialized: true,
  })
);

// Configurar Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware para parsear el cuerpo de las peticiones a JSON
app.use(express.json());

// Rutas para sesiones
app.use("/api/sessions", sessionsRoutes);

// Middleware para verificar el rol de administrador
const checkAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  } else {
    res.status(403).send("Acceso no autorizado");
  }
};

// Middleware para verificar el rol de usuario normal
const checkUser = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    return next();
  } else {
    res.status(403).send("Acceso no autorizado");
  }
};

// Rutas que requieren autorización de administrador
app.post("/admin/createProduct", checkAdmin, productController.createProduct);
app.put(
  "/admin/updateProduct/:id",
  checkAdmin,
  productController.updateProduct
);
app.delete(
  "/admin/deleteProduct/:id",
  checkAdmin,
  productController.deleteProduct
);

// Rutas que requieren autorización de usuario normal
app.post("/user/addToCart", checkUser, cartsController.addToCart);
// Rutas que requieran autorización de usuario normal aquí

// Ruta para la página de inicio
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Ruta para la página de productos
app.get("/productos", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "products.html"));
});

// Ruta para el carrito de compras
app.get("/carrito", (req, res) => {
  res.send("Aquí se mostrará el contenido del carrito de compras");
});

// Ruta para la página de contacto
app.get("/contacto", (req, res) => {
  res.send("Aquí podrás ponerte en contacto con nosotros");
});

// Ruta para el logo
app.get("/logo", (req, res) => {
  // Enviaré el archivo del logo aquí
});

// Ruta para aplicar una transición
app.get("/transicion", (req, res) => {
  // Aplicaré una transición aquí
});

// Ruta para probar los logs
app.get("/loggerTest", (req, res) => {
  logger.debug("Esto es un mensaje de debug");
  logger.info("Esto es un mensaje de información");
  logger.warn("Esto es un mensaje de advertencia");
  logger.error("Esto es un mensaje de error");
  logger.fatal("Esto es un mensaje fatal");
  res.send("Logs generados, verifica la consola o los archivos de registro.");
});

// Manejo de errores personalizado
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send("Algo salió mal en el servidor");
});

// Iniciar el servidor
app.listen(port, () => {
  logger.info(`Servidor escuchando en http://localhost:${port}`);
});
