const mongoose = require("mongoose");

var Morosos = new mongoose.Schema({
  NRO_COMPARENDO_MOROSO: {
    type: String,
    required: true,
  },

  ID_USUARIO_MOROSO: {
    type: String,
    required: true,
  },

  ESTADO_MOROSO: {
    type: String,
    required: true,
  },

  FECHA_COMPARENDO: {
    type: Date,
    required: true,
  },

  FECHA_PAGO: {
    type: Date,
    required: true,
  },

  NRO_FACTURA: {
    type: String,
    required: true,
  },

  OBSERVACION: {
    type: String,
    required: true,
  },

  ESTADO: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Morosos", Morosos);
