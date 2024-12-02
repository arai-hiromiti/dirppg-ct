const express = require('express');
const router = express.Router();
const prazos = require('../controllers/prazos');

router.post('/prazos', prazos.createPrazos);

module.exports = router;