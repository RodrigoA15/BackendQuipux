const router = require("express").Router();

const ComparendosController = require("../controllers/Morosos/ComparendosController");
const DireccionesController = require("../controllers/USUARIOS_TTO_DIRECCIONES/Delete.js");
const LIC = require("../controllers/LIC_CONDUCCION/Delete.js");
const ACLARATORIOS = require("../controllers/ACLARATORIOS/aclaratorios.controller.js");

////////////////////////////////////ComparendosController//////////////////////////////////

router.get("/compa/:ID_USUARIO_MOROSO", ComparendosController.comparendos);
router.put("/compa/:NRO_COMPARENDO_MOROSO", ComparendosController.edit_morosos);
router.get("/fecha", ComparendosController.fecha_modificacion);
router.post("/moroso", ComparendosController.createMoroso);
router.get("/moroso", ComparendosController.allMorosos);
router.get("/moroso/:id_moroso", ComparendosController.MorososByid);
router.put("/moroso/:_id", ComparendosController.UpdateState);
////////////Querys State Morosos//////////////////////
router.get("/state", ComparendosController.getState);
router.get("/states", ComparendosController.getStateSuccess);

//////////////////////DIRECCIONES/////////////////////

router.delete("/direcciones/:ID_USUARIO", DireccionesController.eliminarDir);
router.get("/direcciones/:ID_USUARIO", DireccionesController.alladdres);

///////////////////LICENCIAS CONDUCCION/////////////////////////////

router.delete("/lic_conduccion/:ID_USUARIO", LIC.delete_Lic);
router.get("/lic_conduccion/:ID_USUARIO", LIC.allLicencias);

///////////////////ACLARATORIOS///////////////////////
router.post("/aclaratorios", ACLARATORIOS.CreateAclaratorio);
router.get("/aclaratorios/:ID_USUARIO", ACLARATORIOS.GetContraventores);
router.get("/pendienteAclt/:IDENTIFICADOR_MODIFICADO", ACLARATORIOS.GetPendienteAclt);
router.put("/pendienteAclt/:CONSECUTIVO_MODIFICACION", ACLARATORIOS.SetPendienteAclt)
router.get("/aclaratorio/:IDENTIFICADOR_MODIFICADO", ACLARATORIOS.Aclaratorios)

module.exports = router;
