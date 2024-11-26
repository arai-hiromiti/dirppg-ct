const db = require('../db/models');

module.exports = {

    createNucleos: async (req,res) =>{
        try {
            const dados = req.body;
            console.log(dados);
    
            const dadosNucleo = await db.nucleos.create(dados);
            console.log("nucleo cadastrado");
            return res.status(201).json({
                dadosNucleo
            });
        } catch (error) {
            console.error("Erro ao cadastrar nucleo:", error);
            
            return res.status(500).json({
                mensagem: "Erro ao cadastrar nucleo",
                erro: error.message
            });
        }
    },

    updateNucleos: async (req,res) =>{
        try {
            const idNucleo = req.params.id;
            const dadosAtualizados = req.body;
    
            const nucleo = await db.nucleos.findByPk(idNucleo);
    
            if (!nucleo) {
                return res.status(404).json({ mensagem: "Núcleo não encontrado" });
            }
    
            await nucleo.update(dadosAtualizados);
    
            return res.status(200).json({
                mensagem: "Núcleo atualizado com sucesso",
                nucleo
            });
        } catch (error) {
            console.error("Erro ao atualizar núcleo:", error);
    
            return res.status(500).json({
                mensagem: "Erro ao atualizar núcleo",
                erro: error.message
            });
        }
    },

    deleteNucleos: async (req,res) =>{
        try {
            const idNucleo = req.params.id;
    
            const nucleo = await db.nucleos.findByPk(idNucleo);
    
            if (!nucleo) {
                return res.status(404).json({ mensagem: "Núcleo não encontrado" });
            }
    
            await nucleo.destroy();
    
            return res.status(200).json({ mensagem: "Núcleo excluído com sucesso" });
        } catch (error) {
            console.error("Erro ao excluir núcleo:", error);
    
            return res.status(500).json({
                mensagem: "Erro ao excluir núcleo",
                erro: error.message
            });
        }
    },

    listNucleos: async (req,res) => {
        
        try{
            const {nome} = req.params;
            const nucleo = await db.nucleos.findOne({
                attributes:['id'],
                where: {nome},
            });

            if(nucleo){
                return res.json({
                    nucleo:nucleo.dataValues,
                });
            }
            else{
                return res.json({
                    mensagem :"Nucleo nao encontrado ",
                });
            }
        }catch(error){
            console.error("Erro ao procurar núcleo:", error);
    
            return res.status(500).json({
                mensagem: "Erro ao procurar núcleo",
                erro: error.message
            });
        }    
    }

};
