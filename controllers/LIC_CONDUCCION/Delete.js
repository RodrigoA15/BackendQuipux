const LIC_CONDUCCION = require("../../models/Licencias_Conduccion/LIC_CONDUCCION.js");
const sequelize = require("../../config/Connection.js");

exports.createLIC = async (req, res) => {
  const reqdatos = req.body;

  await LIC_CONDUCCION.create(reqdatos)
    .then((succ) => {
      res.status(200).json("creado");
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
};

exports.delete_Lic = async (req, res) => {
  const { ID_USUARIO } = req.params;

  try {
    await sequelize.query(
      "DELETE FROM LIC_CONDUCCION WHERE ID_USUARIO =:ID_USUARIO",
      {
        replacements: { ID_USUARIO },
      }
    );
    res.json("Licencia eliminada");
  } catch (error) {
    res.json(`Error al eliminar el registro ${error}`);
  }
};

exports.allLicencias = async (req, res) => {
  const { ID_USUARIO } = req.params;

  try {
   const licencias =  await sequelize.query(
      "SELECT * FROM LIC_CONDUCCION WHERE ID_USUARIO =:ID_USUARIO",
      {
        replacements: { ID_USUARIO },
      }
    );
    res.json(licencias);
  } catch (error) {
    console.log(error);
  }
};
