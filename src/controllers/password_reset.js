const passwordResetService = require('../services/passwordReset.js');

module.exports = {
    requestReset: async (req, res) => {
        
        const { email } = req.body;
        console.log(email)
        try {
            await passwordResetService.sendResetEmail(email);
            res.status(200).json({ mensagem: 'Email para redefinição de senha enviado' });
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao solicitar redefinição de senha", erro: error.message });
        }
    },

    confirmReset: async (req, res) => {
        try {
            const { token, novaSenha, confirmSenha } = req.body;
            if (novaSenha !== confirmSenha) {
                return res.status(400).json({ mensagem: 'As senhas não coincidem.' });
            }
            await passwordResetService.resetPassword(token, novaSenha);
            res.status(200).json({ mensagem: 'Senha redefinida com sucesso.' });
        } catch (error) {
            console.error('Erro ao redefinir senha:', error);
            res.status(500).json({ mensagem: 'Erro ao redefinir senha.', erro: error.message });
        }
    },
};
