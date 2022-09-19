const mongoose = require('mongoose');
const Promise = require('bluebird');
const { Schema } = mongoose;
mongoose.Promise = Promise;

const fileSchema = new Schema({ 
    filename: {
        type: String,
        required: false,
        description: 'File Name'
    },
    contentType: {
        type: String,
        required: false,
        description: 'Type of the file'
    },
});

module.exports = { name : 'images.files', schema : fileSchema };

