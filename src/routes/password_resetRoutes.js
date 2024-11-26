const express = require('express');
const router = express.Router();
const passwordResetController = require('../controllers/password_reset');

router.post('/request', passwordResetController.requestReset);

router.post('/password-reset/confirm', passwordResetController.confirmReset);

router.get('/reset-password', (req, res) => {
    const { token } = req.query;
    if (!token) {
        return res.status(400).json({ mensagem: 'Token não fornecido.' });
    }
    res.render('reset_password', { token });
});


module.exports = router;
