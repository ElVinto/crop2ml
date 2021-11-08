const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email: {type: String, required: true},
        password: {type: String, required: true},
        firstName: {type: String, required: false},
        lastName: {type: String, required: false},
        city: {type: String, required: false},
        country: {type: String, required: false},
        institution: {type: String, required: false},
        verified: {type: Boolean, required: true},
        authCode: {type: String, required: false},
        category: {type: String, required: false, enum:['user']
        }, 
    }
);

module.exports = mongoose.model('User', UserSchema, 'users')