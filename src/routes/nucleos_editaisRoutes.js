const express = require('express');
const router = express.Router();
const nucleosEditais = require('../controllers/nucleos_editais');

router.post('/nucleos_editais', nucleosEditais.createAssociation);
router.get('/nucleos_editais', nucleosEditais.listAssociations);

module.exports = router;