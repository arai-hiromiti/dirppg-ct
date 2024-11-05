const express = require ('express');
const router = express.Router();
const db = require('../db/models');

router.post("/editais", async (req, res) => {
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


module.exports = router;