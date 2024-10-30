const express = require( 'express');

const app = express();

//middleware recebe os dados
app.use(express.json());

const users = require('./controllers/usuarios');

const db = require("./db/models");

app.use('/',users);

app.listen(3030,() =>{
    console.log("Servidor iniciado");
});

