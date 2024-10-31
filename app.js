const express = require( 'express');

const app = express();

//middleware recebe os dados
app.use(express.json());

const users = require('./controllers/usuarios');
const nucleos = require('./controllers/nucleos');
const usuarios_nucleos = require('./controllers/usuarios_nucleos');

app.use('/',users);
app.use('/',nucleos)
app.use('/',usuarios_nucleos)


app.listen(3030,() =>{
    console.log("Servidor iniciado");
});

