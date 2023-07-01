const sequelize = require("../../config/Connection.js");

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


