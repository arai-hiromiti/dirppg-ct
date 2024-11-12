const express = require ('express');
const router = express.Router();
const db = require('../db/models');

router.get("/usuarios", async (req, res) => {
    const { email } = req.query;
    try {
        const usuario = await db.usuarios.findOne({
            where: { email },
        });

        if (usuario) {
            return res.status(200).json({
                usuario: usuario.id,
            });
        } else {
            return res.status(404).json({
                mensagem: "Usuário não encontrado",
            });
        }
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro ao buscar usuário", erro: error.message });
    }
});



router.post("/usuarios/login", async (req, res) => {
    try {
        const { email, senha } = req.body;
        const usuario = await db.usuarios.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }
        const senhaValida = await usuario.validarSenha(senha);
        
        if (!senhaValida) {
            return res.status(401).json({ mensagem: "Senha incorreta" });
        }
        return res.status(200).json({ mensagem: "Login bem-sucedido", usuario });

    } catch (error) {
        console.error("Erro ao realizar login:", error);
        return res.status(500).json({ mensagem: "Erro ao realizar login", erro: error.message });
    }
});

router.post("/usuarios", async (req, res) => {
    try {
        const dados = req.body;
        console.log(dados);

        const dadosUsuario = await db.usuarios.create(dados);
        console.log('Usuário cadastrado');
        return res.status(201).json({
            dadosUsuario
        });
      
    } catch (error) {
        return res.status(500).json({
            mensagem: "Erro ao cadastrar usuário",
            erro: error.message
        });
    }
});

router.put("/usuarios/:id",async(req,res)=>{

    var dados=req.body;

    await db.usuarios.update(dados,{where:{id:dados.id}})
    .then(()=>{
        return res.json({
            mensagem :"Usuario editado",
        })
    }).catch(() => {
        return res.json({
            mensagem :"Erro ao editar",
        })
    });
});

router.delete("/usuarios/:id",async (req,res)=>{
    const {id} = req.params;
    await db.usuarios.destry({
        where:{id}
    }).then(()=>{
        return res.json({
            mensagem :"Usuario apagado",
        })
    }).catch(() => {
        return res.json({
            mensagem :"Erro ao excluir",
        })
    });
});


module.exports = router; 