const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const productController = require('./controllers/productController');
const dbConfig = require('./config/dbConfig');

// Middleware para parsear el body de las peticiones a JSON
app.use(express.json());

// Configurar las rutas para los recursos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// Rutas (ejemplo)
const exampleRouter = require('./routes/exampleRoutes');
app.use('/api/example', exampleRouter);

// Ruta raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para la página de productos
app.get('/productos', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'products.html'));
});

// Ruta para el carrito de compras
app.get('/carrito', (req, res) => {
  res.send('Aquí se mostrará el contenido del carrito de compras');
});

// Ruta para la página de contacto
app.get('/contacto', (req, res) => {
  res.send('Aquí podrás ponerte en contacto con nosotros');
});

// Ruta para el logo
app.get('/logo', (req, res) => {
  // Envía el archivo del logo aquí
});

// Ruta para aplicar una transición
app.get('/transicion', (req, res) => {
  // Aplica una transición aquí
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal en el servidor');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
