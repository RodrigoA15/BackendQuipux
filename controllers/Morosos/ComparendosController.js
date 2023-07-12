const { QueryTypes } = require("sequelize");
const sequelize = require("../../config/Connection.js");

exports.comparendos = async (req, res) => {
  try {
    let { NRO_COMPARENDO_MOROSO } = req.params;
    const resultados = await sequelize.query(
      "SELECT * FROM MOROSOS INNER JOIN COMPARENDOS ON MOROSOS.NRO_COMPARENDO_MOROSO = COMPARENDOS.NRO_COMPARENDO WHERE NRO_COMPARENDO_MOROSO = :NRO_COMPARENDO_MOROSO  ",
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

//Servicio para Grafica
exports.fecha_modificacion = async (req, res) => {
  // const { startDate, endDate } = req.query;

  // if (!startDate && !endDate) {
  //   return res
  //     .status(400)
  //     .json({ message: "Debe proporcionar las fechas de inicio y fin." });
  // }

  try {
    const result = await sequelize.query(
      //"SELECT FECHA_MODIFICA_BD FROM MOROSOS WHERE FECHA_MODIFICA_BD BETWEEN TO_DATE(:startDate, 'YYYY-MM-DD HH24:MI:SS') and TO_DATE(:endDate, 'YYYY-MM-DD HH24:MI:SS')",
      //SELECT *  FROM morosos  WHERE  FECHA_MODIFICA_BD BETWEEN TO_DATE('2023-01-24 00:00:00', 'YYYY-MM-DD HH24:MI:SS') and TO_DATE('2023-01-24 23:59:00', 'YYYY-MM-DD HH24:MI:SS')

      "SELECT EXTRACT(YEAR FROM FECHA_RESOLUCION) AS ANIO, COUNT(*) AS NUM_OBSERVACIONES FROM MOROSOS WHERE (UPPER(OBSERVACION) LIKE  '%FACTURA%' OR UPPER(OBSERVACION) LIKE '%PAGADO%' OR UPPER(OBSERVACION) LIKE '%RECIBO%' OR UPPER(OBSERVACION) LIKE '%CURSO%') AND FECHA_RESOLUCION < TO_DATE('12/06/2018', 'DD/MM/YYYY') GROUP BY EXTRACT(YEAR FROM FECHA_RESOLUCION)",
      {
        type: QueryTypes.SELECT,
      }
    );

    res.json(result);
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).send(`Error en la consulta, ${error}`);
  }
};
