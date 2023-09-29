const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Ticket = require("../models/Ticket");
const { isAdmin, isUser } = require("../middleware/authorizationMiddleware");

// Controlador para agregar un producto al carrito
exports.addToCart = async (req, res) => {
  try {
    // Obtener el ID del producto y la cantidad del cuerpo de la solicitud
    const { productId, quantity } = req.body;

    // Buscar el producto en la base de datos
    const product = await Product.findById(productId);

    // Verificar si el producto existe y tiene suficiente stock
    if (!product || product.stock < quantity) {
      return res
        .status(400)
        .json({ error: "Producto no disponible o stock insuficiente" });
    }

    // Crear o recuperar el carrito del usuario (asumimos que el usuario está autenticado)
    const userId = req.user._id; // Obtener el ID del usuario autenticado
    let cart = await Cart.findOne({ user: userId });

    // Si el usuario no tiene un carrito, crear uno nuevo
    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    // Agregar el producto al carrito con la cantidad especificada
    cart.products.push({ product: productId, quantity });

    // Actualizar el stock del producto en la base de datos
    product.stock -= quantity;
    await product.save();

    // Guardar el carrito actualizado en la base de datos
    await cart.save();

    res.status(200).json({ message: "Producto agregado al carrito con éxito" });
  } catch (error) {
    console.error("Error al agregar producto al carrito:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Controlador para finalizar la compra
exports.purchaseCart = async (req, res) => {
  try {
    // Obtener el ID del carrito desde los parámetros de la ruta
    const cartId = req.params.cid;

    // Buscar el carrito en la base de datos
    const cart = await Cart.findById(cartId).populate("products.product");

    // Verificar si el carrito existe
    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    // Verificar el stock de los productos en el carrito y calcular el monto total
    let totalAmount = 0;
    const productsToRemove = [];

    for (const item of cart.products) {
      const product = item.product;
      if (!product.stock || product.stock < item.quantity) {
        productsToRemove.push(item._id);
      } else {
        totalAmount += product.price * item.quantity;
        product.stock -= item.quantity;
        await product.save();
      }
    }

    // Eliminar los productos que se compraron o no tenían stock
    cart.products = cart.products.filter(
      (item) => !productsToRemove.includes(item._id)
    );

    // Guardar el carrito actualizado en la base de datos
    await cart.save();

    // Generar un Ticket para la compra
    const ticket = new Ticket({
      code: generateUniqueCode(),
      purchase_datetime: new Date(),
      amount: totalAmount,
      purchaser: req.user.email,
    });

    // Guardar el Ticket en la base de datos
    await ticket.save();

    res.status(200).json({ message: "Compra realizada con éxito", ticket });
  } catch (error) {
    console.error("Error al finalizar la compra:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Función para generar un código único para el Ticket
function generateUniqueCode() {
  // Generación de un código único aquí
  return "GENERATED_CODE";
}
