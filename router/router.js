const router = require("express").Router();

const ComparendosController = require("../controllers/ComparendosController.js");
const UserRMI = require("../controllers/UsuarioRMI.js");

////////////////////////////////////ComparendosController//////////////////////////////////

router.get("/compa/:NRO_COMPARENDO_MOROSO", ComparendosController.comparendos);
router.put("/compa/:NRO_COMPARENDO_MOROSO", ComparendosController.edit_morosos);


/////////////////////////////USUARIOS RMI////////////////////////////////
router.get("/users", UserRMI.allUsers);
router.get("/ip", UserRMI.ip);


module.exports = router;
