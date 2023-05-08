const User = require('./users.model');
const bcrypt = require('bcrypt');
const {validateEmail, validatePassword, usedEmail} = require('../utils/validators');
const { generateSign } = require('../utils/jwt');

const login = async (req, res) => {
    try {
        const userInfo = await User.findOne({ email: req.body.email});

        if(!userInfo) {
            return res.status(204).json({message: 'invalid email address'})
        }

        if(!bcrypt.compareSync(req.body.password, userInfo.password)) {
            return res.status(204).json({message: 'invalid password'});
        }

        const token = generateSign(userInfo._id, userInfo.email);
        return res.status(200).json({userInfo, token});
    } catch (error) {
        return res.status(500).json(error)
    }
}

const register = async (req, res) => {
    try {
        const newUser = new User(req.body);;

        if(!validateEmail(newUser.email)){
            return res.status(204).send({message: 'Invalid email'});
        }

        if(!validatePassword(newUser.password)){
            return res.status(204).send({message: 'Invalid password'});
        }

        if(await usedEmail(newUser.email) > 0){
            return res.status(204).send({message: 'Email is already in use'});
        }

        newUser.password = bcrypt.hashSync(newUser.password, 10);

        const createdUser = await newUser.save();
        return res.status(201).json(createdUser);
    } catch (error) {
        return res.status(500).json(error)
    }
}

async function logout(req, res) {
    req.session.destroy();
    return res.status(200).json( { "mensaje" : "Session terminada" } );
}

async function tryPassword(req, res) {
    const passwordCrypted = bcrypt.hashSync("1234", 10);
    const compare = bcrypt.compareSync("1234", passwordCrypted);
    return res.status(201).json({message: compare});
}

const checkSession = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        return res.status(500).json(error)
    }
}

async function getUserDetails(req, res) {
    const {id} = req.params;
    try {
        const userInfo = await User.findOne({_id: id});
        return res.status(200).json(userInfo);
    } catch(error) {
        return res.status(500).json(error);
    }
}

async function updateUser(req, res) {
    try {
        const {id} = req.params;
        
        const userToUpdate = new User(req.body);
        
        try {
            userToUpdate.image = req.file.path;
        } catch(e) {
            console.log(e);
        }

        const userUpdated = await User.findByIdAndUpdate(id, userToUpdate, {new: true });
        if(!userUpdated) {
            return res.status(204).json({message: 'Usuario no encontrado'});
        }
        
        return res.status(200).json(userUpdated);
    } catch (error) {
        return res.status(500).json(error)
    }
}

async function deleteUser(req, res) {
    try {
        const {id} = req.params;
        const userToDelete = await User.findByIdAndDelete();
        if(!userToDelete) {
            return res.status(404).json({ "message": "Usuario no encontrado" });
        }
        return res.status(200).json(userToDelete);
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    login,
    register, 
    checkSession, 
    getUserDetails, 
    logout, 
    tryPassword, 
    updateUser,
    deleteUser
};