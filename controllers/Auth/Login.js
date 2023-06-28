const QX_USUARIO = require("../../models/QX_USUARIO");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../env");

exports.Sigin = async (req, res) => {
  const { ID_USUARIO_QX, CLAVE } = req.body;

  try {
    const userFound = await QX_USUARIO.findOne({
      where: {
        ID_USUARIO_QX: ID_USUARIO_QX,
      },
    });

    if (!userFound) {
      console.log("NO se encontro el usuario");
      return;
    } else {
      console.log(userFound);
    }

    const matchPassword = await bcrypt.compare(CLAVE, userFound.CLAVE);
    console.log(`Clave= ${matchPassword}`);

    if (!matchPassword) {
      res.status(404).json({ token: null, message: "Invalid password" });
      return;
    }

    const token = jwt.sign(
      { ID_USUARIO_QX: userFound.ID_USUARIO_QX },
      config.SECRET,
      {
        expiresIn: "24h",
      }
    );

    console.log(token);
  } catch (error) {
    console.error("Error al realizar el inicio de sesión", error);
  }
};
