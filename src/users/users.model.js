const db = require('mysql');

const Schema = db.Schema;

const UserSchema = new Schema(
    {
        id: {type: Number},
        email: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: String, default: 'user', enum: ['admin', 'client', 'guardian']},
        surname: {type: String},
        birthdate: {type: Date},
        image: {type: String}
    },
)

const User = db.model('user', UserSchema);

module.exports = User;