const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/Connection");

class QX_USUARIO extends Model {}

QX_USUARIO.init(
  {
    ID_USUARIO_QX: {
      primaryKey: true,
      type: DataTypes.STRING,
    },

    ID_GRUPO_QX: {
      type: DataTypes.STRING,
    },

    NOMBRE_USUARIO_QX: {
      type: DataTypes.STRING,
    },

    CLAVE: {
      type: DataTypes.STRING,
    },

    FECHA_CREACION: {
      type: DataTypes.STRING,
    },

    DENTRO: {
      type: DataTypes.STRING,
    },

    ID_CARGO: {
      type: DataTypes.STRING,
    },

    USUARIO_ACTIVO: {
      type: DataTypes.STRING,
    },

    CODIGO_USUARIO: {
      type: DataTypes.STRING,
    },

    ID_CIUDAD: {
      type: DataTypes.STRING,
    },

    ID_SECRETARIA: {
      type: DataTypes.STRING,
    },

    CONTROLA_HORARIO: {
      type: DataTypes.STRING,
    },

    ULTIMO_CAMBIO_PWD: {
      type: DataTypes.STRING,
    },

    ID_HORARIO_QX: {
      type: DataTypes.STRING,
    },

    IP: {
      type: DataTypes.STRING,
    },

    CONTROLA_IP: {
      type: DataTypes.STRING,
    },

    DIRECCION: {
      type: DataTypes.STRING,
    },

    TELEFONO: {
      type: DataTypes.STRING,
    },

    FAX: {
      type: DataTypes.STRING,
    },

    EMAIL: {
      type: DataTypes.STRING,
    },

    FIRMA_FUNCIONARIO: {
      type: DataTypes.STRING,
    },

    FECHA_INICIO: {
      type: DataTypes.STRING,
    },

    FECHA_FIN: {
      type: DataTypes.STRING,
    },

    COD_TAQUILLA_BANCO: {
      type: DataTypes.STRING,
    },

    MANEJA_ESPECIE: {
      type: DataTypes.STRING,
    },

    ID_GRUPO_RECAUDO: {
      type: DataTypes.STRING,
    },

    ID_PUNTO_ATENCION: {
      type: DataTypes.STRING,
    },

    ID_MOTIVO_INACTIVO: {
      type: DataTypes.STRING,
    },

    RUNT_CLAVE: {
      type: DataTypes.STRING,
    },

    CONTROLA_TERMINAL: {
      type: DataTypes.STRING,
    },

    NOMBRE_TERMINAL: {
      type: DataTypes.STRING,
    },

    SALT: {
      type: DataTypes.STRING,
    },

    RUNT_SALT: {
      type: DataTypes.STRING,
    },

    FECHA_HUELLA: {
      type: DataTypes.STRING,
    },

    RUNT_HUELLA_AUTENTICACION: {
      type: DataTypes.STRING,
    },

    ANALISTA_CEV: {
      type: DataTypes.STRING,
    },

    REINICIA_CLAVE: {
      type: DataTypes.STRING,
    },

    FECHA_BLOQUEO_ACCESO: {
      type: DataTypes.STRING,
    },

    AUTORIZADO_CTS_VIRTUAL: {
      type: DataTypes.STRING,
    },

    ADMIN_DEPTAL: {
      type: DataTypes.STRING,
    },

    FECHA_MODIFICA_BD: {
      type: DataTypes.STRING,
    },

    USUARIO_DIRECTORIO_ACTIVO: {
      type: DataTypes.STRING,
    },

    ID_TIPO_DIRECTORIO_ACTIVO: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "QX_USUARIO",
    tableName: "QX_USUARIO",
    timestamps: false,
  }
);

QX_USUARIO.sync()
  .then(() => {
    console.log(
      "El modelo qx_usuario se ha sincronizado correctamente con la base de datos."
    );
  })
  .catch((err) => {
    console.error("Error al sincronizar el modelo QX_USUARIO:", err);
  });

module.exports = QX_USUARIO;
