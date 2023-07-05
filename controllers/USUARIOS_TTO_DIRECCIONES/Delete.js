const { DataTypes, QueryTypes } = require("sequelize");
const sequelize = require("../../config/Connection.js");
const USUARIOS_TTO_DIRECCIONES = require("../../models/Direcciones/USUARIOS_TTO_DIRECCIONES.js");

exports.eliminarDir = async (req, res) => {
  const { ID_USUARIO } = req.params;

  try {
    await sequelize.query(
      "DELETE FROM USUARIOS_TTO_DIRECCIONES WHERE ID_USUARIO =:ID_USUARIO",
      {
        replacements: { ID_USUARIO },
      }
    );
    res.json("Direccion eliminada correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).json("Error al eliminar la licencia");
  }
};

exports.alladdres = async (req, res) => {
  const { ID_USUARIO } = req.params;
  try {
    const direcciones = await sequelize.query(
      "SELECT * FROM USUARIOS_TTO_DIRECCIONES WHERE ID_USUARIO =:ID_USUARIO",
      {
        replacements: { ID_USUARIO },
        type: QueryTypes.SELECT,
      }
    );

    if (direcciones.length > 0) {
      res.json(direcciones);
    } else {
      res.status(404).json({
        message:
          "No se encontraron direcciones para el ID de usuario proporcionado",
      });
    }
  } catch (error) {
    console.log(`Error en la consulta ${error}`);
  }
};

// exports.insertaddres = async (req, res) => {
//   const data = req.body;
//   try {
//     const consulta = await USUARIOS_TTO_DIRECCIONES.create(data);

//     if (consulta) {
//       res.json("Direccion creada");
//     } else {
//       res.json("Hubo un error");
//     }
//   } catch (error) {
//     res.json(error);
//   }
// };
