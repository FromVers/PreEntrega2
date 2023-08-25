const Product = require("../models/Product");

exports.getAllProducts = async () => {
  return await Product.find();
};

exports.getProductById = async (productId) => {
  return await Product.findById(productId);
};

exports.createProduct = async (productData) => {
  return await Product.create(productData);
};

exports.updateProduct = async (productId, updatedData) => {
  return await Product.findByIdAndUpdate(productId, updatedData, { new: true });
};

exports.deleteProduct = async (productId) => {
  return await Product.findByIdAndDelete(productId);
};
