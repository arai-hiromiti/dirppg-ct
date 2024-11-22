const express = require ('express');
const router = express.Router();
const db = require('../db/models');
const { Op } = require("sequelize");

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


    const idsArray = Array.isArray(nucleosIds) ? nucleosIds.map(Number) : nucleosIds.split(",").map(Number);

    try {
        const editais = await db.nucleos_editais.findAll({
            attributes: ["edital_id"],
            where: {
                nucleo_id: {
                    [Op.in]: idsArray,
                }
            }
        });
        
        if (editais.length === 0) {
            console.log("Nenhum edital encontrado para os núcleos fornecidos.");
            return res.status(200).json([]); // Retorna um array vazio
        }

        console.log("Editais encontrados:", editais);

        const editaisId = [...new Set(editais.map(edital => edital.edital_id))];

        res.status(200).json(editaisId);

    } catch (error) {
        console.error("Erro ao procurar ID editais:", error);
        res.status(500).json({ mensagem: "Erro ao procurar ID editais", erro: error.message });
    }
});



module.exports = router;