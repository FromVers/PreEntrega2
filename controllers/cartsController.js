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

    // Implementa la lógica de finalización de la compra aquí
    // Verifica el stock de los productos en el carrito, calcula el monto total, genera un Ticket, etc.

    // Ejemplo de generación de un Ticket
    const ticket = new Ticket({
      code: "GENERATED_CODE", // Genera un código único aquí
      purchase_datetime: new Date(),
      amount: 100, // Calcula el monto total aquí
      purchaser: req.user.email, // Correo electrónico del usuario
    });

    // Guarda el Ticket en la base de datos
    await ticket.save();

    // Limpia el carrito (elimina los productos que se compraron)
    cart.products = cart.products.filter((item) => {
      return !item.product.stock || item.product.stock >= item.quantity;
    });

    // Guarda el carrito actualizado en la base de datos
    await cart.save();

    res.status(200).json({ message: "Compra realizada con éxito", ticket });
  } catch (error) {
    console.error("Error al finalizar la compra:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
