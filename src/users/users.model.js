const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        email: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: String, default: 'client', enum: ['admin', 'client', 'guardian']},
        name: {type: String},
        surname: {type: String},
        birthdate: {type: String},
        image: {type: String}
    },
)

const User = mongoose.model('user', UserSchema);

module.exports = User;