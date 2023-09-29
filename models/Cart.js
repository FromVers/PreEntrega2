const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  // Definir la estructura de datos del carrito aquí
  // Por ejemplo, podrías tener un campo para el usuario y otro para los productos en el carrito.
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
