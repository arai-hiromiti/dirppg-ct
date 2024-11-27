const express = require('express');
const router = express.Router();
const usuario = require('../controllers/usuarios.js');

router.post("/usuarios/login",usuario.login);
router.post("/usuarios", usuario.create)
router.post("/usuarios/check-email",usuario.checkEmailExists);
router.get("/usuarios",usuario.list);
router.put("/usuarios",usuario.update);

module.exports = router;