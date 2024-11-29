const db = require('../models');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

module.exports = {
    sendResetEmail: async (email) => {
        const usuario = await db.usuarios.findOne({ where: { email } });
        if (!usuario) {
            throw new Error('Usuário não encontrado.');
        }
        const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Redefinição de Senha',
            text: `Clique no link para redefinir sua senha: ${process.env.FRONTEND_URL}/reset-password?token=${token}`,
        };

        await transporter.sendMail(mailOptions);
    },

    resetPassword: async (token, novaSenha) => {
        console.log(novaSenha);
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const usuario = await db.usuarios.findByPk(decoded.id);
            if (!usuario) {
                throw new Error('Usuário não encontrado.');
            }
            await usuario.update({ senha: novaSenha });
        } catch (error) {
            console.log(error);
        }
    },
};
