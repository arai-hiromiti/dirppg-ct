const express = require('express');
const router = express.Router();
const usuariosNucleos = require('../controllers/usuarios_nucleos');

router.post('/usuarios_nucleos', usuariosNucleos.createAssociation);
router.get('/usuarios_nucleos', usuariosNucleos.listAssociations);
router.delete('/usuarios_nucleos', usuariosNucleos.deleteAssociation);

module.exports = router;
