const { QueryTypes } = require("sequelize");
const sequelize = require("../../config/Connection.js");
const Aclaratorios = require("../../models/Aclaratorios/Aclaratorios.js");

//Consulta BDD QX_TTO

exports.GetAclaratorio = async (req, res) => {
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

//QUERYS BDD MONGO>>>>>>>>>>>

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
