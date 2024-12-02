const db = require('../models');

module.exports = {

    createPrazos: async (req, res) => {
        try{
            const {id_edital, descricao, data} = req.body;
            const response = await db.prazos.create({
                id_edital,
                descricao,
                data,
                createAt:new Date(),
                updateAt: new Date() 
            });
            res.status(201).json(response);
    
            } catch (error) {
                res.status(500).json({ mensagem: "Erro ao criar prazo", erro: error.message });
            }
    },
}; 