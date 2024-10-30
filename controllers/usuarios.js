const express = require ('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db/models');
const { where } = require('sequelize');

//BUSCAR ID
router.get("/usuarios/:id",async(req,res)=>{

    const {id} = req.params;

    const user = await db.usuarios.findOne({
        
        attribute:['nome','email'],
        where: {id},
    });

    if(user){
        return res.json({
            user:user.dataValues,
        });
    }
    else{
        return res.json({
            mensagem :"Erro ",
        });
    }
});

router.post("/usuarios/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        // Encontrar o usuário pelo email
        const usuario = await db.usuarios.findOne({ where: { email } });

        // Verificar se o usuário existe
        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }

        // Verificar a senha
        const senhaValida = await usuario.validarSenha(senha);
        
        if (!senhaValida) {
            return res.status(401).json({ mensagem: "Senha incorreta" });
        }

        // Login bem-sucedido
        return res.status(200).json({ mensagem: "Login bem-sucedido", usuario });
    } catch (error) {
        console.error("Erro ao realizar login:", error);
        return res.status(500).json({ mensagem: "Erro ao realizar login", erro: error.message });
    }
});

//CADASTRAR
router.post("/usuarios", async (req, res) => {
    try {
        const dados = req.body;
        console.log(dados);

        const dadosUsuario = await db.usuarios.create(dados);

        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso",
            dadosUsuario
        });
    } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        
        return res.status(500).json({
            mensagem: "Erro ao cadastrar usuário",
            erro: error.message
        });
    }
});


//EDITAR
router.put("/usuarios",async(req,res)=>{

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

//APAGAR
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