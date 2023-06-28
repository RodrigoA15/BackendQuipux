const router = require("express").Router();

const ComparendosController = require("../controllers/ComparendosController.js");
const UserRMI = require("../controllers/UsuarioRMI.js");
const Auth = require("../controllers/Auth/Login.js");

////////////////////////////////////ComparendosController//////////////////////////////////

router.get("/compa/:NRO_COMPARENDO_MOROSO", ComparendosController.comparendos);
router.put("/compa/:NRO_COMPARENDO_MOROSO", ComparendosController.edit_morosos);

/////////////////////////////USUARIOS RMI////////////////////////////////
router.get("/users", UserRMI.allUsers);
router.get("/ip", UserRMI.ip);
////////////////////////////
router.post("/sigin", Auth.Sigin);

module.exports = router;
