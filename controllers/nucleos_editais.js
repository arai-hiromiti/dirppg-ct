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

router.get("/nucleos_editais", async (req, res) => {

    const { nucleosIds } = req.query;
    const idsArray = Array.isArray(nucleosIds) ? nucleosIds : nucleosIds.split(",");
    parseInt(idsArray,10);

    try {
        const editais = await db.nucleos_editais.findAll({
            where: {
                nucleo_id: {
                    [Op.in]: idsArray,
                }
            }
        });

        const editaisAgrupados = editais.reduce((acc, edital) => {
            const Id = edital.edital_id;
            if (!acc[Id]) acc[Id] = [];
            acc[Id].push(edital);
            return acc;
        }, 
        {});

        const editaisId = editaisAgrupados.map(edital => edital.edital_id);

        res.status(200).json(editaisId);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao listar editais", erro: error.message });
    }
});



module.exports = router;