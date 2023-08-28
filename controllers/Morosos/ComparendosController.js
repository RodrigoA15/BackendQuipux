const { QueryTypes } = require("sequelize");
const sequelize = require("../../config/Connection.js");
const Morosos = require("../../models/Morosos/Morosos.js");

exports.comparendos = async (req, res) => {
  try {
    let { ID_USUARIO_MOROSO } = req.params;
    const resultados = await sequelize.query(
      "SELECT * FROM MOROSOS INNER JOIN COMPARENDOS ON MOROSOS.NRO_COMPARENDO_MOROSO = COMPARENDOS.NRO_COMPARENDO WHERE ID_USUARIO_MOROSO = :ID_USUARIO_MOROSO",
      {
        replacements: { ID_USUARIO_MOROSO },
        type: QueryTypes.SELECT,
      }
    );
    res.json(resultados);
  } catch (error) {
    console.error("Error en la consulta:", error);
    res.status(500).send(`Error en la consulta, ${error}`);
  }
};

//Update correspondiente a la DB de QX
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

//Querys De MONGODB >>>>>

//Crear Comparendos Morosos
exports.createMoroso = async (req, res) => {
  const {
    NRO_COMPARENDO_MOROSO,
    ID_USUARIO_MOROSO,
    ESTADO_MOROSO,
    FECHA_COMPARENDO,
    FECHA_PAGO,
    NRO_FACTURA,
    OBSERVACION,
    ESTADO,
  } = req.body;

  try {
    const response = await Morosos.create({
      NRO_COMPARENDO_MOROSO,
      ID_USUARIO_MOROSO,
      ESTADO_MOROSO,
      FECHA_COMPARENDO,
      FECHA_PAGO,
      NRO_FACTURA,
      OBSERVACION,
      ESTADO,
    });

    if (response.length > 0) {
      res.status(200).json({ message: "Creado ", response });
    } else {
      res.json("No se pudo crear");
    }
  } catch (error) {
    console.log("Hubo Error: " + error);
  }
};

//Listado de morosos
exports.allMorosos = async (req, res) => {
  const morosos = await Morosos.find({});
  try {
    if (morosos.length > 0) {
      res.status(200).json({ message: "Listado de Morosos", morosos });
    } else {
      res.status(404).json({ message: "Not found " });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Hubo un error al traer el listado: " + error });
  }
};

//Mostrar morosos por id
exports.MorososByid = async (req, res) => {
  const id_moroso = req.params.id_moroso;

  try {
    const response = await Morosos.find({ _id: id_moroso });

    if (response.length > 0) {
      res.status(200).send({ message: "Morosos", response });
    } else {
      res.status(404).send({ message: "No se encontro el moroso" });
    }
  } catch (error) {
    console.log("Hubo un error: ", error);
  }
};

//Actualizar Estado para manejar notificaciones

exports.UpdateState = async (req, res) => {
  const _id = req.params._id;
  const { ESTADO } = req.body;
  try {
    const updating = await Morosos.find({ _id: _id });

    if (updating.length > 0) {
      await Morosos.findByIdAndUpdate(_id, { ESTADO });
      console.log(_id);
      res.status(200).json({ message: "Estado Actualizado Correctamente" });
    } else {
      res.status(404).json({ message: "No se encontro el usuario" });
    }
  } catch (error) {
    console.log("Hubo un error al actualizar El estado ", error);
  }
};

//Querys para listar por estados >>>>>

exports.getState = async (req, res) => {
  try {
    const state = await Morosos.find({
      ESTADO: 1,
    });

    if (state.length > 0) {
      res.status(200).json(state);
    } else {
      res.status(404).send({ message: "NO hay Notificaciones pendientes" });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getStateSuccess = async (req, res) => {
  try {
    const state = await Morosos.find({
      ESTADO: 2,
    });

    if (state.length > 0) {
      res.status(200).json(state);
    } else {
      res.status(404).send({ message: "NO hay Notificaciones realizadas" });
    }
  } catch (error) {
    console.log("error en la consulta", error);
  }
};
