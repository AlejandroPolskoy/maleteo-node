const express = require('express');
const { getLocation, setLocation, uploadImage, getAllLocations, getLocations, newReserva, getReservas, acceptReserva, declineReserva} = require('./anuncios.controller');
const upload = require('../middleware/upload.cloud');
//const { isAuth, isAdmin } = require('../../middlewares/auth');
const router = express.Router(); 

router.post('/setLocation', upload.single('image'), setLocation);
router.get('/getLocation/:id', getLocation);
router.get('/getLocations/:id', getLocations);
router.get('/getAllLocations', getAllLocations);
router.post('/newReserva', newReserva);
router.get('/getReservas/:id', getReservas);
router.put('/acceptReserva/:id', acceptReserva);
router.put('/declineReserva/:id', declineReserva);
router.post('/uploadImage', upload.single('image'), uploadImage);

module.exports = router;