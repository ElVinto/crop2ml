const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommunitySchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: false},
        createdBy: {type: String, required: false},
        administrators: {type: [String], required: false},
        modelPackages: {type: [String], required: false},
        picture: {type: String, required: false},
    }
);

module.exports = mongoose.model('Community', CommunitySchema, 'communities')