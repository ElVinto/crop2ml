const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email: {type: String, required: true},
        password: {type: String, required: true},
        firstName: {type: String, required: false},
        lastName: {type: String, required: false},
        pseudo: {type: String, required: false},
        category: {
            type: String,
            required: false,
            enum:['user']
        }, 
    }
);

module.exports = mongoose.model('User', UserSchema, 'users')