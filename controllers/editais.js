const express = require ('express');
const router = express.Router();
const db = require('../db/models');
const { Op } = require('sequelize');

router.post("/editais/:email", async (req, res) => {
    try {
        const { nucleo, link_1, link_2, descricao, atividade, periodo, titulo } = req.body;
        const dados = {
            nucleo,
            link_1,
            link_2,
            descricao,
            atividade,
            periodo,
            titulo
        };
        console.log(dados);

        const dadosEditais = await db.editais.create(dados);
        console.log('Edital cadastrado');
        return res.status(201).json({
            dadosEditais
        });
      
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao cadastrar edital",
            erro: error.message
        });
    }
});


router.get("/editais", async (req, res) => {
    const { nucleosIds } = req.query;
    const idsArray = Array.isArray(nucleosIds) ? nucleosIds : nucleosIds.split(",");
    console.log("Núcleos recebidos no backend:", idsArray);
    try {
        const editais = await db.editais.findAll({
            where: {
                id: {
                    [Op.in]: idsArray,
                }
            }
        });

        const editaisAgrupados = editais.reduce((acc, edital) => {
            const Id = edital.id;
            if (!acc[Id]) acc[Id] = [];
            acc[Id].push(edital);
            return acc;
        }, {});

        res.status(200).json(editaisAgrupados);
    } catch (error) {
        console.error("Erro ao listar editais:", error); 
        res.status(500).json({ mensagem: "Erro ao listar editais", erro: error.message });
    }
});



module.exports = router;