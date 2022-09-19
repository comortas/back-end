const mongoose = require('mongoose');
const { Schema } = mongoose;

const urlSchema = new Schema({
    
    code: {
        type: String,
        required: false
    },
    longUrl : {
        type: String,
        required: false
    },
    shortUrl : {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = { name : 'UrlShortens', schema : urlSchema };