const mongoose = require("mongoose");

const AclaratorioSchema = new mongoose.Schema({
  ID_USUARIO: {
    type: String,
    required: true,
  },

  NRO_COMPARENDO: {
    type: String,
    required: true,
  },

  NOMBRE_USUARIO: {
    type: String,
    required: true,
  },

  APELLIDO_USUARIO: {
    type: String,
    required: true,
  },

  FECHA_COMPARENDO: {
    type: Date,
    required: true,
  },

  DIRECCION: {
    type: String,
    required: true,
  },

  NUMERO_PLACA: {
    type: String,
    required: true,
  },

  FECHA_REGISTRA: {
    type: String,
    required: true,
  },

  OBSERVACIONES_COMPARENDO: {
    type: String,
    required: true,
  },

  APELLIDO_AGENTE: {
    type: String,
    required: true,
  },

  NOMBRE_AGENTE: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ACLARATORIOS", AclaratorioSchema);
