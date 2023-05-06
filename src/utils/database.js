const mysql = require('mysql');
const dotenv = require('dotenv').config();
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSWD,
    database: process.env.DB_NAME
});

const connect = async () => {
    
    db.connect(function(err) {
    if (err) throw err;
    console.log("MySQL Connected");
    });

    return db;
}

module.exports = {connect}