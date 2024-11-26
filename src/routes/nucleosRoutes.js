const express = require('express');
const router = express.Router();
const nucleos = require('../controllers/nucleos');

router.post('/nucleos', nucleos.createNucleos);
router.put("/nucleos/:id",nucleos.updateNucleos);
router.delete("/nucleos/:id",nucleos.deleteNucleos);
router.get("/nucleos/:nome",nucleos.listNucleos);

module.exports = router;