const express = require('express');
const router = express.Router();
const editais = require('../controllers/editais');

router.post('/editais', editais.createEdital);
router.get('/editais', editais.getEditais);

module.exports = router;