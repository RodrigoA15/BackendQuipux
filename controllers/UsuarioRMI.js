const sequelize = require("../config/Connection.js");
const { QueryTypes } = require("sequelize");

exports.allUsers = async (req, res) => {
  try {
    const consulta = await sequelize.query(
      "SELECT NOMBRE_USUARIO_QX FROM QX_USUARIO WHERE ID_GRUPO_QX = '1'"
    );
    res.json(consulta);
  } catch (error) {
    res.json(`Error en la consulta ${error}`);
    console.log(`Error en la consulta ${error}`);
  }
};

exports.ip = (req, res) => {
  const ip = req.connection.remoteAddress;

  // Verifica si la dirección IP es IPv6 y obtiene solo la parte IPv4
  const ipv4Address = ip.includes(":") ? ip.split(":").slice(-1)[0] : ip;

  res.json(`Dirección IPv4 del cliente: ${ipv4Address} `);
};
