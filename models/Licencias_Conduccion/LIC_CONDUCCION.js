const sequelize = require("../../config/Connection.js");
const { DataTypes, Model } = require("sequelize");

class LIC_CONDUCCION extends Model {}

LIC_CONDUCCION.init(
  {
    ID_USUARIO: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },

    ID_CATEGORIA: {
      type: DataTypes.STRING(2),
    },

    ID_ESCUELA: {
      type: DataTypes.FLOAT,
    },

    NRO_DOC_DATOS: {
      type: DataTypes.STRING(15),
    },

    NRO_LICENCIA: {
      type: DataTypes.STRING(20),
    },

    FECHA_EXPEDICION: {
      type: DataTypes.DATE,
    },

    FECHA_VENCIMIENTO: {
      type: DataTypes.DATE,
    },

    ID_TRAMITE: {
      type: DataTypes.FLOAT,
    },

    CERTIFICADO: {
      type: DataTypes.STRING(10),
    },

    FECHA_CERTI: {
      type: DataTypes.DATE,
    },

    POLIZA_VENC: {
      type: DataTypes.STRING(10),
    },

    FECHA_POLIZA: {
      type: DataTypes.DATE,
    },

    RELACION_ENVIO: {
      type: DataTypes.STRING(10),
    },

    RELACION_ENVIO: {
      type: DataTypes.STRING(10),
    },

    LICENCIA_ACTUAL: {
      type: DataTypes.STRING(1),
    },

    ID_SECRETARIA: {
      type: DataTypes.FLOAT,
    },

    FECHA_RELACION_ENVIO: {
      type: DataTypes.DATE,
    },

    FECHA_DIGITA: {
      type: DataTypes.DATE,
    },

    COMPROBANTE_PAGO: {
      type: DataTypes.STRING(38),
    },

    ID_ESPECIE: {
      type: DataTypes.FLOAT,
    },

    NRO_TRAMITE: {
      type: DataTypes.NUMBER(10, 0),
    },

    CERT_MEDICO: {
      type: DataTypes.STRING(10),
    },

    ID_CATEGORIA_RUNT: {
      type: DataTypes.STRING(2),
    },

    NRO_LICENCIA_RUNT: {
      type: DataTypes.STRING(20),
    },

    ID_PUNTO_ATENCION: {
      type: DataTypes.STRING(20),
    },
  },
  {
    sequelize,
    modelName: "LIC_CONDUCCION",
    tableName: "LIC_CONDUCCION",
    timestamps: false,
  }
);

LIC_CONDUCCION.sync()
  .then(() => {
    console.log("El modelo LIC_CONDUCCION se sincronizo correctamente");
  })
  .catch(() => {
    console.log("Hubo un error en la sincronizacion del modelo LIC_CONDUCCION");
  });

module.exports = LIC_CONDUCCION;
