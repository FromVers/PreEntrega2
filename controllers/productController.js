const Product = require('../models/Product');

// Obtener todos los productos con filtros, paginación y ordenamientos
exports.getAllProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort === 'desc' ? -1 : 1;
    const query = req.query.query || {};

    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ price: sort });

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'An error occurred while fetching products' });
  }
};
