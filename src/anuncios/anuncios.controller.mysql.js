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

function getPropertieTypes(req, res) {
    try {
        DB.query("SELECT * FROM Property_type ", (err, results)=> {
            return res.status(200).json(results);
        })
    } catch(e) {
        return res.status(500).json(e);
    }
}

// get location by id as query
function getLocation(req, res) {
    let {id} = req.query;
    try {
        DB.query("SELECT * FROM Locations WHERE id = ? ", [id], (err, results)=> {
            if(results.length == 1 )
            return res.status(200).json(results);
        })
    } catch(e) {
        return res.status(500).json(e);
    }
}

function getAllLocations() {
    try {
        DB.query("SELECT * FROM Locations ", (err, results)=> {
            return res.status(200).json(results);
        })
    } catch(e) {
        return res.status(500).json(e);
    }
}

function setLocation(req, res) {
    // get or post?
    const newLocation = req.body; //post
    const id = req.body.id || 0;
    try {
        DB.query(
            `INSERT INTO Locations (id, coords, images, description, id_type, id_property) VALUES(?, ?, ?, ?, ?, ?, ?, ?)`
            , [id, newLocation.coords, newLocation.images, newLocation.description, newLocation.id_type, newLocation.id_property],
            (err, result)=>{
                return res.status(201).json(req.body);
            }
        );
    } catch(e) {
        return res.status(500).json(e);
    }
}
// upload a single image. Returns new image path
function uploadImage(req, res) {
    if(req.file.path){
        const image = req.file.path;
        return res.status(200).json(image);
    }
}

module.exports = { getStorageTypes, getPropertieTypes, getLocation, getAllLocations, setLocation, uploadImage };