const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KeywordSchema = new Schema(
    {
        keyword: {type: String, required: true},
        modelIdValue: {type: String, required: true},
    }
);

module.exports = mongoose.model('Keyword', KeywordSchema, 'keywords')