const express = require("express");
const session = require("express-session");
const passport = require("./config/passportConfig");
const path = require("path");
const productController = require("./controllers/productController");
const cartController = require("./controllers/cartController"); // Asegúrate de importar cartController u el controlador adecuado para el carrito
const dbConfig = require("./config/dbConfig");
const sessionsRoutes = require("./routes/sessionRoutes");

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
app.post("/user/addToCart", checkUser, cartController.addToCart);
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

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal en el servidor");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
