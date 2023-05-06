const jwt = require('jsonwebtoken');

const generateSign = (id, email) => {
    return jwt.sign({id, email}, process.env.JWT_KEY, {expiresIn: '1h'});       //generamos un token o firma en base a nuestro id y email con nuestra JWT_KEY
}

const verifySign = (token) => {
    return jwt.verify(token, process.env.JWT_KEY);  // comprobar que nuestro token en base a nuestro JWT_KEY coincide con id y email
}

module.exports = {generateSign, verifySign}