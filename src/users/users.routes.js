const express = require('express');
const {login, register, checkSession, getUserDetails, logout, tryPassword, updateUser} = require('./users.controller');
const upload = require('../middleware/upload.cloud');
//const { isAuth, isAdmin } = require('../../middlewares/auth');
const router = express.Router();


router.post('/login', login);
router.post('/register', register);
router.get('/details/:id', getUserDetails);
router.get('/try', tryPassword);
router.put('/update/:id', upload.single('image'), updateUser);
//router.post('/checksession', [isAuth], checkSession);
// router.post('/logout',(req, res, next)=>{console.log("voy al login"); next()} MIDDLEWARE --> Hará algo y luego CONTINUA con la siguiente acción, logout);

module.exports = router;