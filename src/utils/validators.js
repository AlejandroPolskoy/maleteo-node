//const User = require("../api/models/user.model");
var mysql = require('mysql');
const dotenv = require('dotenv').config();
const DB = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSWD,
    database: process.env.DB_NAME
});

const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //Regex email

    return regex.test(String(email).toLowerCase());
}


const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; //  REGEX PASSWORD 1 Uppercase 1 Lowercase 1 number, minimo 8
    return regex.test(String(password));
}

const usedEmail = async (email) => {
    DB.query("SELECT * FROM Users WHERE email = ?", [email], (err, result)=> {
        return result.length;
    } )
}


module.exports = {validateEmail, validatePassword, usedEmail};

