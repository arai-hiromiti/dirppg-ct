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
const prazos = require('./src/routes/prazosRoutes');

app.use('/',users);
app.use('/',nucleos);
app.use('/',usuarios_nucleos);
app.use('/',editais);
app.use('/',nucleos_editais);
app.use('/',redef_senha);
app.use('/',passwordReset);
app.use('/',prazos);

app.use((req,res,next) =>{
    res.header('Acess-Control-Allow-Origin','*');
    res.header('Acess-Constrol-Allow-Header',
        'Origin, X-Requrested-With, Content-Type, Accept, Authorization'
    );

    if(req.method == 'OPTIONS'){
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    };
    
    next();
});

app.listen(3030,'0.0.0.0',() =>{
    console.log("Servidor iniciado");
});

