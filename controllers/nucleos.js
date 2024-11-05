const express = require ('express');
const router = express.Router();
const db = require('../db/models');

//CADASTRAR
router.post("/nucleos", async (req, res) => {
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
});

router.put("/nucleos/:id", async (req, res) => {
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
});

// Excluir núcleo
router.delete("/nucleos/:id", async (req, res) => {
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
});

router.get("/nucleos/:nome",async(req,res)=>{

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
});

module.exports = router;