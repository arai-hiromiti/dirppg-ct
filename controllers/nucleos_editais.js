const express = require ('express');
const router = express.Router();
const db = require('../db/models');

router.post("/nucleos_editais", async (req, res) => {
    try {
        const { edital_id, nucleo_id } = req.body;
        const novaAssociacao = await db.nucleos_editais.create({ 
            nucleo_id,
            edital_id, 
            createAt:new Date(),
            updateAt: new Date() 
        });
        res.status(201).json(novaAssociacao);

    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao criar associação", erro: error.message });
    }
});



module.exports = router;