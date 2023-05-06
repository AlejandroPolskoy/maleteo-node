const express = require('express');
const {getStorageTypes, getPropertieTypes, getLocation, setLocation, uploadImage, getAllLocations} = require('./anuncios.controller');
const upload = require('../middleware/upload.cloud');
//const { isAuth, isAdmin } = require('../../middlewares/auth');
const router = express.Router(); 

router.post('/setLocation', setLocation);
router.get('/getLocation/:id', getLocation);
router.get('/getLocations', getAllLocations);
router.get('/getPropertieTypes', getPropertieTypes);
router.get('/getStorageTypes', getStorageTypes);
router.post('/uploadImage', upload.single('image'), uploadImage);

module.exports = router;