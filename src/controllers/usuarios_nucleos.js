const db = require('../models');

module.exports = {
    createAssociation: async (req, res) => {
        try {
            const { usuario_id, nucleo_id } = req.body;
            const novaAssociacao = await db.usuarios_nucleos.create({ 
                usuario_id, 
                nucleo_id,
                createAt: new Date(),
                updateAt: new Date(),
            });
            res.status(201).json(novaAssociacao);
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao criar associação", erro: error.message });
        }
    },

    listAssociations: async (req, res) => {
        const { usuario_id } = req.query;
        try {
            const associacoes = await db.usuarios_nucleos.findAll({
                where: { usuario_id },
            });

            const nucleoIds = associacoes.map(associacao => associacao.nucleo_id);
            res.status(200).json(nucleoIds);
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao listar associações", erro: error.message });
        }
    },

    deleteAssociation: async (req, res) => {
        const { usuario_id, nucleo_id } = req.body;
        try {
            const associacao = await db.usuarios_nucleos.findOne({
                where: { usuario_id, nucleo_id },
            });

            if (!associacao) {
                return res.status(404).json({ mensagem: "Associação não encontrada" });
            }

            await associacao.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ mensagem: "Erro ao deletar associação", erro: error.message });
        }
    },
};
