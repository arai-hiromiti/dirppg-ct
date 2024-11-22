const express = require ('express');
const router = express.Router();
const db = require('../db/models');

router.post("/usuarios_nucleos", async (req, res) => {
    try {
        const { usuario_id, nucleo_id } = req.body;
        const novaAssociacao = await db.usuarios_nucleos.create({ 
            usuario_id, 
            nucleo_id,
            createAt:new Date(),
            updateAt: new Date() 
        });
        res.status(201).json(novaAssociacao);

    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao criar associação", erro: error.message });
    }
});

router.get("/usuarios_nucleos", async (req, res) => {
    const {usuario_id} = req.query;
    try {
        const associacoes = await db.usuarios_nucleos.findAll({
            where: {usuario_id}
        });

        const nucleoIds = associacoes.map(associacao => associacao.nucleo_id);
        res.status(200).json(nucleoIds);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao listar associações", erro: error.message });
    }
});

router.delete("/usuarios_nucleos", async (req, res) => {
    const { usuario_id, nucleo_id } = req.body;  
    console.log(usuario_id,nucleo_id);

    try {
        const associacao = await db.usuarios_nucleos.findOne({
            where: { usuario_id, nucleo_id }
        });

        if (!associacao) {
            return res.status(404).json({ mensagem: "Associação não encontrada" });
        }

        await associacao.destroy();
        res.status(204).send();

    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao deletar associação", erro: error.message });
    }
});


module.exports = router;