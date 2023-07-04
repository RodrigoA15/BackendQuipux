const router = require("express").Router();

const ComparendosController = require("../controllers/ComparendosController.js");
const UserRMI = require("../controllers/UsuarioRMI.js");
const Auth = require("../controllers/Auth/Login.js");
const DireccionesController = require("../controllers/USUARIOS_TTO_DIRECCIONES/Delete.js");
const LIC = require("../controllers/LIC_CONDUCCION/Delete.js");
////////////////////////////////////ComparendosController//////////////////////////////////

router.get("/compa/:NRO_COMPARENDO_MOROSO", ComparendosController.comparendos);
router.put("/compa/:NRO_COMPARENDO_MOROSO", ComparendosController.edit_morosos);

/////////////////////////////USUARIOS RMI////////////////////////////////
router.get("/users", UserRMI.allUsers);
router.get("/ip", UserRMI.ip);
////////////////////////////
router.post("/sigin", Auth.Sigin);
//////////////////////DIRECCIONES/////////////////////
router.delete("/direcciones/:ID_USUARIO", DireccionesController.eliminarDir);
router.get("/direcciones", DireccionesController.alladdres);
router.post("/direcciones", DireccionesController.insertaddres);
///////////////////LICENCIAS CONDUCCION/////////////////////////////
router.post("/lic_conduccion", LIC.createLIC);
router.delete("/lic_conduccion/:ID_USUARIO", LIC.delete_Lic);
router.get("/lic_conduccion/:ID_USUARIO", LIC.allLicencias);

module.exports = router;
