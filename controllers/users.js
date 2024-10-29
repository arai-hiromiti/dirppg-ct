const express = require ('express');
const router = express.Router();

const db = require('./../db/models');
const { where } = require('sequelize');

/* LISTAR USUARIOS.
router.get("/users",async(req,res)=>{
    const users = await db.usuarios.findAll({

        Escolher quais atributos atrributes:[id,nome], 
        ordder: [['id','DESC']]
    });

    if(users){
        return res.json({
            users
        });
    }
    else{
        return res.status(400).json({
            mensagem :"Erro ao listar usuarios",
        });
    }
});
*/

//BUSCAR ID
router.get("/users/:id",async(req,res)=>{

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


//CADASTRAR
router.post("/users", async (req, res) => {
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
router.put("/users",async(req,res)=>{

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
router.delete("/users/:id",async (req,res)=>{
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