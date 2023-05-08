var mysql = require('mysql');
const dotenv = require('dotenv').config();
const DB = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSWD,
    database: process.env.DB_NAME
});

// get location by id as query
async function getLocation(req, res) {
    let {id} = req.query;
    try {
        const location = await Location.findOne(id);
        return res.status(200).json(results);
    } catch(e) {
        return res.status(500).json(e);
    }
}

async function getAllLocations() {
    try {
        const locations = await Location.findAll();
        return res.status(200).json(results);
    } catch(e) {
        return res.status(500).json(e);
    }
}

async function setLocation(req, res) {
    // get or post?
    const newLocation = new Location(req.body); //post
    const id = req.body.id || 0;
    try {
        if(id) {
            // update
            User.findByIdAndUpdate(id, newLocation, {new: true });
        } else {
            // add new
            newLocation.save();
        }
        return res.status(201).json(newLocation);
    } catch(e) {
        return res.status(500).json(e);
    }
}
// upload a single image. Returns new image path
async function uploadImage(req, res) {
    if(req.file.path){
        const image = req.file.path;
        return res.status(200).json(image);
    }
}

module.exports = { getLocation, getAllLocations, setLocation, uploadImage };