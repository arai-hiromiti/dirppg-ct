const express = require ('express');
const router = express.Router();
const db = require('../db/models');


// Cadastrar uma nova associação entre usuário e núcleo
router.post("/usuarios_nucleos", async (req, res) => {
    try {
        const { idUsuario, idNucleo } = req.params;

        // Verificar se o usuário e o núcleo existem
        const usuario = await db.usuarios.findByPk(idUsuario);
        const nucleo = await db.nucleos.findByPk(idNucleo);

        if (!usuario || !nucleo) {
            return res.status(404).json({ mensagem: "Usuário ou Núcleo não encontrado" });
        }

        // Criar a associação
        const novaAssociacao = await db.usuarios_nucleos.create({
            id_usuarios: idUsuario,
            id_nucleo: idNucleo
        });

        return res.status(201).json({
            mensagem: "Associação criada com sucesso",
            novaAssociacao
        });
    } catch (error) {
        console.error("Erro ao criar associação:", error);

        return res.status(500).json({
            mensagem: "Erro ao criar associação",
            erro: error.message
        });
    }
});

// Listar núcleos associados a um usuário
router.get("/usuarios/:idUsuario/nucleos", async (req, res) => {
    try {
        const { idUsuario } = req.params;

        const usuario = await db.usuarios.findByPk(idUsuario);
        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        const nucleos = await db.Nucleos.findAll({
            include: {
                model: db.Usuarios_Nucleos,
                where: { id_usuarios: idUsuario },
                attributes: []
            }
        });

        return res.status(200).json(nucleos);
    } catch (error) {
        console.error("Erro ao listar núcleos do usuário:", error);

        return res.status(500).json({
            mensagem: "Erro ao listar núcleos do usuário",
            erro: error.message
        });
    }
});

// Editar a associação (substituir um núcleo associado a um usuário)
router.put("/usuarios/:idUsuario/nucleos/:idNucleo", async (req, res) => {
    try {
        const { idUsuario, idNucleo } = req.params;
        const { novoIdNucleo } = req.body; // O novo núcleo para associar ao usuário

        const associacao = await db.Usuarios_Nucleos.findOne({
            where: { id_usuarios: idUsuario, id_nucleo: idNucleo }
        });

        if (!associacao) {
            return res.status(404).json({ mensagem: "Associação não encontrada" });
        }

        associacao.id_nucleo = novoIdNucleo;
        await associacao.save();

        return res.status(200).json({
            mensagem: "Associação atualizada com sucesso",
            associacao
        });
    } catch (error) {
        console.error("Erro ao atualizar associação:", error);

        return res.status(500).json({
            mensagem: "Erro ao atualizar associação",
            erro: error.message
        });
    }
});

// Excluir associação entre usuário e núcleo
router.delete("/usuarios/:idUsuario/nucleos/:idNucleo", async (req, res) => {
    try {
        const { idUsuario, idNucleo } = req.params;

        const associacao = await db.Usuarios_Nucleos.findOne({
            where: { id_usuarios: idUsuario, id_nucleo: idNucleo }
        });

        if (!associacao) {
            return res.status(404).json({ mensagem: "Associação não encontrada" });
        }

        await associacao.destroy();

        return res.status(200).json({ mensagem: "Associação excluída com sucesso" });
    } catch (error) {
        console.error("Erro ao excluir associação:", error);

        return res.status(500).json({
            mensagem: "Erro ao excluir associação",
            erro: error.message
        });
    }
});


module.exports = router;