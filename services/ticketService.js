const Ticket = require("../models/Ticket");

// Función para generar un ticket de compra
async function generateTicket(cart, userEmail, totalAmount) {
  try {
    // Crea un nuevo objeto Ticket con los datos proporcionados
    const newTicket = new Ticket({
      code: generateUniqueCode(), // Genera un código único para el ticket (deberás implementar esta función)
      purchase_datetime: new Date(), // Guarda la fecha y hora actual
      amount: totalAmount, // Monto total de la compra
      purchaser: userEmail, // Correo electrónico del usuario que realizó la compra
    });

    // Guarda el ticket en la base de datos
    await newTicket.save();

    return newTicket; // Devuelve el ticket generado
  } catch (error) {
    console.error("Error generando el ticket:", error);
    throw error; // Maneja cualquier error que pueda ocurrir durante la generación del ticket
  }
}

// Función para generar un código único para el ticket (puedes implementarla según tus necesidades)
function generateUniqueCode() {
  // Aquí puedes implementar la lógica para generar códigos únicos
  // Por ejemplo, podrías combinar la fecha actual con un número aleatorio
  const currentDate = new Date();
  const randomCode = Math.floor(Math.random() * 10000); // Número aleatorio entre 0 y 9999
  return `TICKET-${currentDate.getTime()}-${randomCode}`;
}

module.exports = {
  generateTicket,
};
