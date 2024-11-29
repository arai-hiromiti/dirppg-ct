const jwt = require ('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decode;
        next();
    }catch(error){
        return res.status(401).send({mensagem:'Falha auteticação'});
    }
}