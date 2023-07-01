const sequelize = require("../../config/Connection");
const { DataTypes, Model } = require("sequelize");
const { sync } = require("../QX_USUARIO");

class USUARIOS_TTO_DIRECCIONES extends Model {}

USUARIOS_TTO_DIRECCIONES.init(
  {
    ID_USUARIO: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

    CONSECUTIVO_DIRECCION: {
      type: DataTypes.STRING,
    },

    DIRECCION: {
      type: DataTypes.STRING,
    },

    ID_MUNICIPIO: {
      type: DataTypes.STRING,
    },

    ID_TIPO_DIRECCION: {
      type: DataTypes.STRING,
    },

    TELEFONO: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "USUARIOS_TTO_DIRECCIONES",
    tableName: "USUARIOS_TTO_DIRECCIONES",
    timestamps: false,
  }
);

USUARIOS_TTO_DIRECCIONES.sync()
  .then(() => {
    console.log(
      "El modelo USUARIOS_TTO_DIRECCIONES se ha sincronizado correctamente"
    );
  })
  .catch(() => {
    console.log(
      "HUbo un error al realizar la sincronizacion del modelo USUARIOS_TTO_DIRECCIONES"
    );
  });

module.exports = USUARIOS_TTO_DIRECCIONES;
