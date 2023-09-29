const Ticket = require("../models/Ticket");

class TicketDao {
  async createTicket(ticketData) {
    try {
      const ticket = new Ticket(ticketData);
      return await ticket.save();
    } catch (error) {
      throw error;
    }
  }

  async findTicketById(ticketId) {
    try {
      return await Ticket.findById(ticketId);
    } catch (error) {
      throw error;
    }
  }

  async findTicketsByUser(userId) {
    try {
      return await Ticket.find({ purchaser: userId });
    } catch (error) {
      throw error;
    }
  }

  async updateTicket(ticketId, ticketData) {
    try {
      return await Ticket.findByIdAndUpdate(ticketId, ticketData, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteTicket(ticketId) {
    try {
      return await Ticket.findByIdAndDelete(ticketId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TicketDao();
