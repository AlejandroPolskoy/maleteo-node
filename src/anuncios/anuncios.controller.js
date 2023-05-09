const { Location } = require('./models');
const User = require('../users/users.model');

// get location by id as query
async function getLocation(req, res) {
    let {id} = req.params;
    try {
        const location = await Location.findOne({_id: id}).populate('owner');
        return res.status(200).json(location);
    } catch(e) {
        return res.status(500).json(e);
    }
}

async function getLocations(req, res) {
    let {id} = req.params;
    try {
        const location = await Location.find({owner: id});
        return res.status(200).json(location);
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
    const newLocation = new Location(req.body); //post]
    
    try {
        newLocation.image = req.file.path;
        const user = await User.findOne( {_id: newLocation.owner} );
        user.role = "guardian";
        await user.save();
        await newLocation.save();
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

module.exports = { getLocation, getAllLocations, setLocation, uploadImage, getLocations };