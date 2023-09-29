const Ticket = require("../models/Ticket");

class TicketRepository {
  // Método para crear un nuevo ticket
  async createTicket(ticketData) {
    try {
      const newTicket = new Ticket(ticketData);
      const savedTicket = await newTicket.save();
      return savedTicket;
    } catch (error) {
      throw error;
    }
  }

  // Método para obtener un ticket por su ID
  async getTicketById(ticketId) {
    try {
      const ticket = await Ticket.findById(ticketId);
      return ticket;
    } catch (error) {
      throw error;
    }
  }

  // Método para obtener todos los tickets de un usuario por su correo electrónico
  async getUserTickets(userEmail) {
    try {
      const tickets = await Ticket.find({ purchaser: userEmail });
      return tickets;
    } catch (error) {
      throw error;
    }
  }

  // Método para actualizar un ticket por su ID
  async updateTicket(ticketId, updateData) {
    try {
      const updatedTicket = await Ticket.findByIdAndUpdate(
        ticketId,
        updateData,
        { new: true }
      );
      return updatedTicket;
    } catch (error) {
      throw error;
    }
  }

  // Método para eliminar un ticket por su ID
  async deleteTicket(ticketId) {
    try {
      await Ticket.findByIdAndDelete(ticketId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TicketRepository();
