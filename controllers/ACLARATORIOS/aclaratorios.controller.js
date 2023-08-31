const { QueryTypes } = require("sequelize");
const sequelize = require("../../config/Connection.js");
const Aclaratorios = require("../../models/Aclaratorios/Aclaratorios.js");

//Consulta BDD QX_TTO

exports.GetContraventores = async (req, res) => {
  const { ID_USUARIO } = req.params;
  try {
    const aclaratorios = await sequelize.query(
      `SELECT CT.ID_USUARIO, CT.NRO_COMPARENDO,
      UT.NOMBRES AS NOMBRE_USUARIO, UT.APELLIDOS AS APELLIDO_USUARIO,
      CM.FECHA, CM.DIRECCION, CM.NUMERO_PLACA, CM.FECHA_REGISTRA, CM.OBSERVACIONES_COMPARENDO,
      AT.APELLIDOS AS APELLIDO_AGENTE, AT.NOMBRES AS NOMBRE_AGENTE
      FROM CONTRAVENTORES CT
      INNER JOIN QUIPUX.USUARIOS_TTO UT ON CT.ID_USUARIO = UT.ID_USUARIO
      INNER JOIN QUIPUX.COMPARENDOS CM ON CT.NRO_COMPARENDO = CM.NRO_COMPARENDO
      INNER JOIN QUIPUX.AGENTES_TTO AT ON CM.ID_AGENTE = AT.ID_AGENTE  
      WHERE UT.ID_USUARIO = :ID_USUARIO `,
      {
        replacements: { ID_USUARIO },
        type: QueryTypes.SELECT,
      }
    );

    if (!aclaratorios.length > 0)
      return res.status(404).json("NO hay Comparendos");

    return res.status(200).json(aclaratorios);
  } catch (error) {
    res.status(500).json("Error: " + error.message);
  }
};

exports.ValidacionAclt = async (req, res, next) => {
  const { IDENTIFICADOR_MODIFICADO } = req.params;
  try {
    const consulta = await sequelize.query(
      "SELECT * FROM AUDITORIA_MODIFICACIONES WHERE DESCRIPCION_MODIFICACION LIKE :DESCRIPTION AND IDENTIFICADOR_MODIFICADO = :IDENTIFICADOR_MODIFICADO",
      {
        replacements: {
          DESCRIPTION: "%RLMFDS%",
          IDENTIFICADOR_MODIFICADO: IDENTIFICADOR_MODIFICADO,
        },
        type: QueryTypes.SELECT,
      }
    );

    if (consulta.length > 0) {
      res
        .status(200)
        .json({ message: ["Este comparendo ya tiene un aclaratorio"] });
    } else {
      next();
    }
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

exports.GetPendienteAclt = async (req, res) => {
  console.log("Se ejecutó el siguiente controlador");
  const { IDENTIFICADOR_MODIFICADO } = req.params;
  try {
    const pendientes = await sequelize.query(
      `SELECT  
      auditoria_modificaciones.identificador_modificado,
      comparendos.fecha as Fechacomparendo,
      agentes_tto.placa_agente,
      agentes_tto.nombres|| agentes_tto.apellidos AS Nombres,
      quipux.tipo_infraccion.cod_simit,
      comparendos.estado_comparendo,
      tipo_estado_comparendo.descripcion_estado,
      auditoria_modificaciones.consecutivo_modificacion, 
      auditoria_modificaciones.id_usuario_qx, 
      auditoria_modificaciones.fecha_modificacion, 
      auditoria_modificaciones.descripcion_modificacion,
      comparendos.observaciones_comparendo
      FROM auditoria_modificaciones 
      INNER JOIN comparendos on auditoria_modificaciones.identificador_modificado = comparendos.nro_comparendo
      INNER join QUIPUX.agentes_tto on comparendos.id_agente = agentes_tto.id_agente
      INNER JOIN QUIPUX.infracciones_comparendos on comparendos.nro_comparendo = infracciones_comparendos.nro_comparendo
      INNER join quipux.tipo_infraccion on infracciones_comparendos.id_infraccion = tipo_infraccion.id_infraccion
      INNER join QUIPUX.tipo_estado_comparendo on comparendos.estado_comparendo = tipo_estado_comparendo.estado_comparendo
      WHERE  auditoria_modificaciones.identificador_modificado = :IDENTIFICADOR_MODIFICADO 
      `,
      {
        replacements: {
          IDENTIFICADOR_MODIFICADO,
        },
        type: QueryTypes.SELECT,
      }
    );
    console.log(IDENTIFICADOR_MODIFICADO);

    if (pendientes.length > 0) {
      res.status(200).json(pendientes);
    } else {
      res.status(404).json("NO hay Comparendos");
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

exports.SetPendienteAclt = async (req, res) => {
  const { CONSECUTIVO_MODIFICACION } = req.params;
  const { DESCRIPCION_MODIFICACION } = req.body;

  try {
    await sequelize.query(
      "UPDATE AUDITORIA_MODIFICACIONES SET DESCRIPCION_MODIFICACION =:DESCRIPCION_MODIFICACION WHERE CONSECUTIVO_MODIFICACION = :CONSECUTIVO_MODIFICACION",
      {
        replacements: {
          CONSECUTIVO_MODIFICACION,
          DESCRIPCION_MODIFICACION,
        },
      }
    );
    console.log("SIUUU" + DESCRIPCION_MODIFICACION);
    res.status(200).json("Descripcion actualizada correctamente");
  } catch (error) {
    res.status(500).json(`Error de server ${error}`);
  }
};

exports.Aclaratorios = async (req, res) => {
  const { IDENTIFICADOR_MODIFICADO } = req.params;
  try {
    const consulta = await sequelize.query(
      `SELECT DESCRIPCION_MODIFICACION,IDENTIFICADOR_MODIFICADO, CONSECUTIVO_MODIFICACION FROM QUIPUX.AUDITORIA_MODIFICACIONES 
      WHERE DESCRIPCION_MODIFICACION LIKE '%PENDIENTE ACLARATORIO%' 
      AND IDENTIFICADOR_MODIFICADO = :IDENTIFICADOR_MODIFICADO `,
      {
        replacements: { IDENTIFICADOR_MODIFICADO },
        type: QueryTypes.SELECT,
      }
    );
    if (consulta.length > 0) {
      res.status(200).json(consulta);
    } else {
      res.status(404).json("Este comparendo no tiene Aclaratorios Pendientes");
    }
  } catch (error) {
    console.log(`Error Aclaratorios ${error}`);
    res.status(500).json(error);
  }
};

exports.Agentes = async (req, res) => {
  try {
    const agentes = await sequelize.query(
      "SELECT ID_AGENTE, NOMBRES, APELLIDOS FROM QUIPUX.AGENTES_TTO WHERE ESTADO_AGENTE = 'A'",
      {
        type: QueryTypes.SELECT,
      }
    );
    if (agentes.length > 0) return res.status(200).json(agentes);
    return res.json("No hay agentes");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//Grafica Actividad >>>>>>>

exports.ActividadDashboard = async (req, res) => {
  try {
    const consulta = await sequelize.query(
      `SELECT TO_CHAR(fecha_modificacion, 'Month') AS mes, COUNT(*) AS modificaciones
      FROM AUDITORIA_MODIFICACIONES
      WHERE UPPER(DESCRIPCION_MODIFICACION) LIKE '%RLMFDS%'
      GROUP BY TO_CHAR(fecha_modificacion, 'Month')
      ORDER BY modificaciones DESC;`,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (consulta.length > 0) return res.status(200).json(consulta);
    return res.json("No hay agentes");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//QUERYS BDD MONGO>>>>>>>>>>>
//DEPRECATED
exports.CreateAclaratorio = async (req, res) => {
  const {
    ID_USUARIO,
    NRO_COMPARENDO,
    NOMBRE_USUARIO,
    APELLIDO_USUARIO,
    FECHA_COMPARENDO,
    DIRECCION,
    NUMERO_PLACA,
    FECHA_REGISTRA,
    OBSERVACIONES_COMPARENDO,
    APELLIDO_AGENTE,
    NOMBRE_AGENTE,
  } = req.body;

  try {
    const newAclaratorio = new Aclaratorios({
      ID_USUARIO,
      NRO_COMPARENDO,
      NOMBRE_USUARIO,
      APELLIDO_USUARIO,
      FECHA_COMPARENDO,
      DIRECCION,
      NUMERO_PLACA,
      FECHA_REGISTRA,
      OBSERVACIONES_COMPARENDO,
      APELLIDO_AGENTE,
      NOMBRE_AGENTE,
    });

    await newAclaratorio.save();
    res.status(200).json(newAclaratorio);
  } catch (error) {
    res.status(500).json("Error" + error.message);
  }
};
