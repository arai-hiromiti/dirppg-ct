const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const db = require('../db/models'); 
const {sendResetEmail} = require('../db/services/email');


router.post('/request-redefinicao', async (req, res) => {
    try {
        const { email } = req.body;

        const user = await db.usuarios.findOne({ where: { email } });
        console.log(user);
        if (!user) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

        const token = crypto.randomBytes(32).toString('hex');
        const expiration = new Date(Date.now() + 3600000); 

        console.log(token,expiration);

        await user.update({
            resetToken: token, 
            resetTokenExpiration: expiration 
        });

        await sendResetEmail(email, token);

        res.status(200).json({ mensagem: 'Email de redefinição de senha enviado' });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao solicitar redefinição de senha", erro: error.message });
    }
});

router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const user = await db.User.findOne({
            where: {
                resetToken: token,
                resetTokenExpiration: { [Op.gt]: new Date() }
            }
        });

        if (!user) return res.status(400).json({ mensagem: 'Token inválido ou expirado' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await user.update({
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiration: null
        });

        res.status(200).json({ mensagem: 'Senha redefinida com sucesso' });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao redefinir senha", erro: error.message });
    }
});

module.exports = router;
