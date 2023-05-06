//const User = require('./users.model');
const bcrypt = require('bcrypt');
const {validateEmail, validatePassword, usedEmail} = require('../utils/validators');
//const { generateSign } = require('../utils/jwt');
var mysql = require('mysql');
const dotenv = require('dotenv').config();
const DB = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSWD,
    database: process.env.DB_NAME
});

const login = async (req, res) => {
    //console.log( req.body);
    try {
        const userInfo = req.body;
        
        if(!userInfo.email || !userInfo.password) return res.status(404).json({message: 'email and password is required'})

        DB.query(`SELECT * FROM Users WHERE email = ?`,[req.body.email], (error, results) => {
            console.log("results: ", error, results);

            if(results.length == 0) {
                return res.status(404).json({message: 'invalid email address'})
            }

            if(!bcrypt.compareSync(req.body.password, results[0].password)){
                return res.status(404).json({message: 'invalid password'});
            }

            const token = generateSign(results[0].id, userInfo.email)
            return res.status(200).json({userInfo, token});
        });

    } catch (error) {
        return res.status(500).json(error)
    }
}

const register = async (req, res) => {
    //console.log(req.body);
    try {
        const newUser = req.body;

        if(!validateEmail(newUser.email)){
            return res.status(400).send({message: 'Invalid email'});
        }

        if(!validatePassword(newUser.password)){
            return res.status(400).send({message: 'Invalid password'});
        }

        if(await usedEmail(newUser.email) > 0){
            return res.status(400).send({message: 'Email is already in use'});
        }

        newUser.password = bcrypt.hashSync(newUser.password, 10);

        DB.query(
            `INSERT INTO Users (id, email, password, name, surname, direction, birthdate, image) VALUES(0, ?, ?, ?, ?, ?, ?, ?)`
            , [newUser.email, newUser.password, newUser.name, newUser.surname, newUser.direction, newUser.birthdate, newUser.image],
            (err, result)=>{
                return res.status(201).json(req.body);
            }
        );
    } catch (error) {
        return res.status(500).json(error)
    }
}

const checkSession = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {login, register, checkSession};