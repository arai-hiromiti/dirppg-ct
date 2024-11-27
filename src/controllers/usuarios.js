const express = require ('express');
const db = require('../db/models');

module.exports = {

    login: async ( req, res) => {
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
    },

    create: async ( req, res) => {
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
    },

    checkEmailExists: async (req, res) => {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ mensagem: "Email não informado." });
            }
    
            const usuarioExistente = await db.usuarios.findOne({ where: { email } });
            if (usuarioExistente) {
                return res.status(200).json({ exists: true });
            }
    
            return res.status(200).json({ exists: false });
        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao verificar email",
                erro: error.message
            });
        }
    },

    update: async ( req, res) => {

        const dados=req.body;
        try{
            await db.usuarios.update(dados,{where:{id:dados.id}})
            return res.status(201).json({
                mensagem :"Usuario editado",
            })
        }
        catch(error){
            return res.status(500).json({
                mensagem: "Erro ao Atualizar dados Usuário",
                erro: error.message
            });
        }
    },

    list: async ( req, res) => {
        const { email } = req.query;
        try {
            const usuario = await db.usuarios.findOne({
                where: { email },
            });

            if (usuario) {
                return res.status(200).json({
                    usuario: usuario,
                });
            } else {
                return res.status(404).json({
                    mensagem: "Usuário não encontrado",
                });
            }
        } catch (error) {
            return res.status(500).json({ mensagem: "Erro ao buscar usuário", erro: error.message });
        }
    }


};