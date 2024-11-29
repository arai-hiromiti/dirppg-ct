const db = require('../models');
const { Op } = require('sequelize');

module.exports = {

    createEdital: async (req,res) => {
        try{
            const { nucleo, link1, link2, descricao, atividade, periodo, titulo } = req.body;
            const dados = {nucleo,link1,link2,descricao,atividade,periodo,titulo};
            const dadosEditais = await db.editais.create(dados);

            console.log('Edital cadastrado');

            return res.status(201).json({
                dadosEditais
            });
          
        }catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao cadastrar edital",
                erro: error.message
            });
        }
    },

    getEditais: async (req,res) => {

        const { id } = req.query;
        const idsArray = Array.isArray(id) ? id.map(Number) : id.split(",").map(Number);

        try {
            const editais = await db.editais.findAll({
                where: {
                    id: {
                        [Op.in]: idsArray,
                    }
                }
            });

            res.status(200).json(editais);
        } catch (error) {
            console.error("Erro ao listar editais:", error); 
            res.status(500).json({ mensagem: "Erro ao listar editais", erro: error.message });
        }
    },

};
