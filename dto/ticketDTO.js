// ticketDTO.js

class TicketDTO {
  constructor(id, code, purchase_datetime, amount, purchaser) {
    this.id = id;
    this.code = code;
    this.purchase_datetime = purchase_datetime;
    this.amount = amount;
    this.purchaser = purchaser;
  }

  static fromDatabase(ticketData) {
    const { _id, code, purchase_datetime, amount, purchaser } = ticketData;
    return new TicketDTO(_id, code, purchase_datetime, amount, purchaser);
  }

  toResponseFormat() {
    return {
      id: this.id,
      code: this.code,
      purchase_datetime: this.purchase_datetime,
      amount: this.amount,
      purchaser: this.purchaser,
    };
  }
}

module.exports = TicketDTO;
