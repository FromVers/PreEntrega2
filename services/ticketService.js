const Ticket = require("../models/Ticket");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Esta función procesa la compra del carrito de un usuario
async function procesarCompra(userId, cartId) {
  try {
    // 1. Verifica si el usuario tiene un carrito y obtén el carrito
    const cart = await Cart.findOne({ _id: cartId, user: userId }).populate(
      "items.product"
    );

    if (!cart) {
      throw new Error("El carrito no existe o no pertenece a este usuario.");
    }

    // 2. Inicializa un arreglo vacío para los elementos comprados y el total de la compra
    const ticketItems = [];
    let totalAmount = 0;

    // 3. Procesa cada elemento en el carrito
    for (const cartItem of cart.items) {
      const product = cartItem.product;
      const requestedQuantity = cartItem.quantity;

      // Verifica si hay suficiente stock disponible para la cantidad solicitada
      if (product.stock >= requestedQuantity) {
        // Calcula el monto del artículo y actualiza el stock
        const itemAmount = product.price * requestedQuantity;
        product.stock -= requestedQuantity;
        totalAmount += itemAmount;

        // Agrega el artículo al arreglo de elementos comprados
        ticketItems.push({
          product: product._id,
          name: product.title,
          quantity: requestedQuantity,
          amount: itemAmount,
        });
      }
    }

    // 4. Crea un nuevo ticket con un código único, fecha y hora de compra, monto total y usuario comprador
    const ticket = new Ticket({
      code: generateUniqueTicketCode(), // Implementa esta función para generar códigos únicos
      purchase_datetime: new Date(),
      amount: totalAmount,
      purchaser: userId,
      items: ticketItems,
    });

    // 5. Guarda el ticket en la base de datos y actualiza el carrito
    await ticket.save();

    // 6. Elimina los elementos comprados del carrito
    cart.items = cart.items.filter(
      (cartItem) =>
        !ticketItems.some((item) => item.product.equals(cartItem.product))
    );
    await cart.save();

    // 7. Devuelve el ticket creado
    return ticket;
  } catch (error) {
    throw error;
  }
}

// Esta función debe implementarse para generar códigos únicos para los tickets
function generateUniqueTicketCode() {
  // Implementa la lógica para generar códigos únicos aquí
}

module.exports = { procesarCompra };
