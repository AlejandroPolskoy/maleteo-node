var mysql = require('mysql');
const dotenv = require('dotenv').config();

const DB = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSWD,
    database: process.env.DB_NAME
});

function getStorageTypes(req, res) {

    try {
        DB.query("SELECT * FROM Storage_type ", (err, results)=> {
            return res.status(200).json(results);
        })
    } catch(e) {
        return res.status(500).json(e);
    }
    
}

module.exports = { getStorageTypes };