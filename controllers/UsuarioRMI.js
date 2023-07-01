const sequelize = require("../config/Connection.js");
const { QueryTypes } = require("sequelize");
const QX_USUARIO = require("../models/QX_USUARIO.js");
const USUARIOS_TTO_DIRECCIONES = require("../models/Direcciones/USUARIOS_TTO_DIRECCIONES.js");
const LIC_CONDUCCION = require("../models/Licencias_Conduccion/LIC_CONDUCCION.js");

// exports.allUsers = async (req, res) => {
//   try {
//     const consulta = await sequelize.query(
//       "SELECT NOMBRE_USUARIO_QX FROM QX_USUARIO WHERE ID_GRUPO_QX = '1'"
//     );
//     res.json(consulta);
//   } catch (error) {
//     res.json(`Error en la consulta ${error}`);
//     console.log(`Error en la consulta ${error}`);
//   }
// };

exports.ip = (req, res) => {
  const ip = req.connection.remoteAddress;

  // Verifica si la dirección IP es IPv6 y obtiene solo la parte IPv4
  const ipv4Address = ip.includes(":") ? ip.split(":").slice(-1)[0] : ip;

  res.json(`Dirección IPv4 del cliente: ${ipv4Address} `);
};

exports.allUsers = async (req, res) => {
  // let hola1 = req.params.hola1;
  try {
    const hola1 = await USUARIOS_TTO_DIRECCIONES.findAll();
    res.json(hola1);
  } catch (error) {
    console.log(error);
  }
};

// exports.allUsers = async (req, res) => {
//   // let hola1 = req.params.hola1;
//   try {
//     const hola1 = await USUARIOS_TTO_DIRECCIONES.findAll();
//     console.log(hola1);
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.allUsers = async (req, res) => {
//   // let hola1 = req.params.hola1;
//   try {
//     const hola1 = await LIC_CONDUCCION.findAll();
//     console.log(hola1);
//   } catch (error) {
//     console.log(error);
//   }
// };
