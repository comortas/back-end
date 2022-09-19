
const mongoose = require('mongoose');
const Promise = require('bluebird');
const { Schema } = mongoose;
mongoose.Promise = Promise;

const emailTemplatePlaceHolderSchema = new Schema({

    templateId: {
        type: Number,
        required: true,
        description: 'Template Id'
    },
    templateInfo: [{
        name: {
            type: String,
            required: true
        },
        provisionKey: {
            type: String,
            required: true
        },
        type : {
            type : String,
            required : true
        }
    }]

}, {
    timestamps: true
});

module.exports = { name : 'EmailTemplatePlaceHolder', schema : emailTemplatePlaceHolderSchema };

