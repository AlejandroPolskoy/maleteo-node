const { verifySign } = require("../utils/jwt");
//const User = require("../api/models/user.model");
var mysql = require('mysql');
const dotenv = require('dotenv').config();
const DB = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSWD,
    database: process.env.DB_NAME
});


const isAuth = async (req, res, next) =>{
    try {
        //const authorization = req.headers.authorization;   //recogemos la authorization del request
        const authorization = req.body.token || req.headers.authorization;

        if(!authorization){         // si no hay authorization entonces no estamos autorizados
            return res.status(401).json({message: "unauthorized"})
        } 

        const token = authorization.split(" ")[1];  //cogemos el token de nuestra authorization
        if(!token){         //si no hay token no estamos autorizados
            return res.status(401).json({message: "no token provided"});
        }

        let tokenVerified = verifySign(token, process.env.JWT_KEY);     //verificamos nuestro token
        if(!tokenVerified.id){
            return res.status(401).json(tokenVerified);
        }

        DB.query("SELECT * FROM Users WHERE id = ?", [tokenVerified.id], (err, result)=> {
            if(result.length == 1) {
                // we are in
                req.user = result[0];
                next();
            } else {
                // destroy token
            }
        })

    } catch (error) {
        return res.status(500).json(error);
    }
}


const isAdmin = async (req, res, next) =>{
    try {
        const  authorization = req.headers.authorization;   //recogemos la authorization del request

        if(!authorization){         // si no hay authorization entonces no estamos autorizados
            return res.status(401).json({message: "unauthorized"})
        } 

        //dasdasdasd Asdasdsad adsasdasd .split(' ') --> [dasdasdasd,Asdasdsad,adsasdasd]
        const token = authorization.split(" ")[1];  //cogemos el token de nuestra authorization
        if(!token){         //si no hay token no estamos autorizados
            return res.status(401).json({message: "no token provided"});
        }

        let tokenVerified = verifySign(token, process.env.JWT_KEY);     //verificamos nuestro tokekn
        if(!tokenVerified.id){
            return res.status(401).json(tokenVerified);
        }
        
        console.log(tokenVerified);
        const userLogged = await User.findById(tokenVerified.id); //buscamos el usuario autorizado

        if(userLogged.role !== 'Admin'){
            return res.status(401).json({message: 'Necesitas se administrador'});
        }
        req.user = userLogged; //añadimos el token autorizado a la request

        next();

        
    } catch (error) {
        return res.status(500).json(error);
    }
}


module.exports = {isAuth, isAdmin}