const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { generateMockProducts } = require("../mockingModule");

// Obtener todos los productos con filtros, paginación y ordenamientos
router.get("/", productController.getAllProducts);

// Ruta para obtener productos simulados (mocking)
router.get("/mockingproducts", (req, res) => {
  const mockProducts = generateMockProducts();
  res.json(mockProducts);
});

// Obtener un producto por su ID
router.get("/:id", productController.getProductById);

// Agregar un nuevo producto
router.post("/", productController.createProduct);

// Actualizar un producto por su ID
router.put("/:id", productController.updateProduct);

// Eliminar un producto por su ID
router.delete("/:id", productController.deleteProduct);

module.exports = router;
