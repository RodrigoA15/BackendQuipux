const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Morosos = Schema({
  NRO_COMPARENDO_MOROSOS: {
    type: String,
    required: true,
  },

  ID_USUARIO_MOROSO: {
    type: String,
    required: true,
  },

  ESTADO_COMPARENDO: {
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

  OBSERVACIONES: {
    type: String,
    required: true,
  },

  ESTADO: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Morosos", Morosos);
