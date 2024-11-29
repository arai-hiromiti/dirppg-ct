const express = require('express');
const router = express.Router();
const usuario = require('../controllers/usuarios.js');
const update = require('../middleware/update.js')

router.post("/usuarios/login",usuario.login);
router.post("/usuarios", usuario.create)
router.post("/usuarios/check-email",usuario.checkEmailExists);
router.get("/usuarios",usuario.list);
router.patch("/usuarios",update,usuario.update);

module.exports = router;