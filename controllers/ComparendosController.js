const { QueryTypes } = require("sequelize");
const sequelize = require("../config/Connection.js");

exports.comparendos = async (req, res) => {
  try {
    let { NRO_COMPARENDO_MOROSO } = req.params;
    const resultados = await sequelize.query(
      "SELECT * FROM MOROSOS WHERE NRO_COMPARENDO_MOROSO = :NRO_COMPARENDO_MOROSO ",
      {
        replacements: { NRO_COMPARENDO_MOROSO },
        type: QueryTypes.SELECT,
      }
    );
    res.json(resultados);
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).send(`Error en la consulta, ${error}`);
  }
};

exports.edit_morosos = async (req, res) => {
  const { NRO_COMPARENDO_MOROSO } = req.params;
  const { ESTADO_MOROSO, OBSERVACION } = req.body;

  try {
    await sequelize.query(
      "UPDATE morosos SET ESTADO_MOROSO =  :ESTADO_MOROSO, OBSERVACION = :OBSERVACION  where  NRO_COMPARENDO_MOROSO =  :NRO_COMPARENDO_MOROSO",
      {
        replacements: { NRO_COMPARENDO_MOROSO, ESTADO_MOROSO, OBSERVACION },
      }
    );
    console.log("Estado actualizado correctamente");
    res.json("Estado actualizado correctamente");
  } catch (error) {
    console.error(`Error al actualizar el estado ${error}`);
    res.json(error);
  }
};
