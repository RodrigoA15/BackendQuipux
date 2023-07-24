const router = require("express").Router();

const ComparendosController = require("../controllers/Morosos/ComparendosController");
const DireccionesController = require("../controllers/USUARIOS_TTO_DIRECCIONES/Delete.js");
const LIC = require("../controllers/LIC_CONDUCCION/Delete.js");

////////////////////////////////////ComparendosController//////////////////////////////////

router.get("/compa/:NRO_COMPARENDO_MOROSO", ComparendosController.comparendos);
router.put("/compa/:NRO_COMPARENDO_MOROSO", ComparendosController.edit_morosos);
router.get("/fecha", ComparendosController.fecha_modificacion);
router.post("/moroso", ComparendosController.createMoroso);
router.get("/moroso", ComparendosController.allMorosos);
router.get("/moroso/:id_moroso", ComparendosController.MorososByid);
router.put("/moroso/:id_moroso", ComparendosController.UpdateState);

//////////////////////DIRECCIONES/////////////////////

router.delete("/direcciones/:ID_USUARIO", DireccionesController.eliminarDir);
router.get("/direcciones/:ID_USUARIO", DireccionesController.alladdres);

///////////////////LICENCIAS CONDUCCION/////////////////////////////

router.delete("/lic_conduccion/:ID_USUARIO", LIC.delete_Lic);
router.get("/lic_conduccion/:ID_USUARIO", LIC.allLicencias);

module.exports = router;
