# PreEntrega2
Mi eCommerce
Este es un proyecto de eCommerce desarrollado con Node.js, Express y MongoDB. Permite gestionar productos y carritos de compras. Los usuarios pueden ver todos los productos disponibles, agregar productos al carrito y ponerse en contacto con el equipo de soporte.

Configuración
Clona este repositorio en tu máquina local.
Instala las dependencias usando npm install.
Configura la base de datos MongoDB en el archivo config/dbConfig.js.
Ejecuta el servidor usando npm start.

Uso
Página de inicio: http://localhost:8080/
Página de productos: http://localhost:8080/productos
Página del carrito de compras: http://localhost:8080/carrito
Página de contacto: http://localhost:8080/contacto
Endpoints API
El servidor proporciona los siguientes endpoints para interactuar con los productos:

GET /api/products: Obtiene todos los productos con filtros, paginación y ordenamientos.
GET /api/products/:id: Obtiene un producto por su ID.
POST /api/products: Agrega un nuevo producto.
PUT /api/products/:id: Actualiza un producto por su ID.
DELETE /api/products/:id: Elimina un producto por su ID.
