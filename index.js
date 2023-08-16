const express = require("express");
const session = require("express-session");
const passport = require("./config/passportConfig");
const path = require("path");
const productController = require("./controllers/productController");
const userController = require("./controllers/userController");
const dbConfig = require("./config/dbConfig");
const sessionsRoutes = require("./routes/sessionsRoutes");

const app = express();
const port = 8080;

// Configurar la sesión
app.use(
  session({
    secret: "ClaveClave", // Cambia esto por una clave secreta más segura
    resave: false,
    saveUninitialized: true,
  })
);

// Configurar Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware para parsear el body de las peticiones a JSON
app.use(express.json());

// Rutas para sesiones
app.use("/api/sessions", sessionsRoutes);

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

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal en el servidor");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
