const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  level: { type: String, required: true }, // Nivel del log (debug, info, error, etc.)
  message: { type: String, required: true }, // Mensaje del log
  timestamp: { type: Date, default: Date.now }, // Fecha y hora del log
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
