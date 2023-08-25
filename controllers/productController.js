const ProductDao = require("../dao/productDao");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductDao.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductDao.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the product" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    const createdProduct = await ProductDao.createProduct(newProduct);
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the product" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await ProductDao.updateProduct(productId, req.body);
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the product" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await ProductDao.deleteProduct(productId);
    if (deletedProduct) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the product" });
  }
};
