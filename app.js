require('dotenv').config();
const express = require( 'express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'src/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const passwordReset = require('./src/routes/password_resetRoutes')
const users = require('./src/routes/usuariosRoutes');
const nucleos = require('./src/routes/nucleosRoutes');
const usuarios_nucleos = require('./src/routes/usuarios_nucleosRoutes');
const editais = require('./src/routes/editaisRoutes');
const nucleos_editais = require('./src/routes/nucleos_editaisRoutes');
const redef_senha = require('./src/routes/password_resetRoutes');


app.use('/',users);
app.use('/',nucleos);
app.use('/',usuarios_nucleos);
app.use('/',editais);
app.use('/',nucleos_editais);
app.use('/',redef_senha);
app.use('/',passwordReset);


app.listen(3030,'0.0.0.0',() =>{
    console.log("Servidor iniciado");
});

