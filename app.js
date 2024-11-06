const express = require( 'express');

const app = express();

//middleware recebe os dados
app.use(express.json());

const users = require('./controllers/usuarios');
const nucleos = require('./controllers/nucleos');
const usuarios_nucleos = require('./controllers/usuarios_nucleos');
const editais = require('./controllers/editais');
const nucleos_editais = require('./controllers/nucleos_editais');
const redef_senha = require('./controllers/email_auth');

app.use('/',users);
app.use('/',nucleos);
app.use('/',usuarios_nucleos);
app.use('/',editais);
app.use('/',nucleos_editais);
app.use('/',redef_senha);


app.listen(3030,() =>{
    console.log("Servidor iniciado");
});

