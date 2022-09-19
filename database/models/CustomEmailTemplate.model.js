
const mongoose = require('mongoose');
const Promise = require('bluebird');
const { Schema } = mongoose;
mongoose.Promise = Promise;


const customEmailTemplateSchema = new Schema({

    templateId: {
        type: Number,
        required: false,
        description: 'Template Id'
    },
    templateType: {
        type: String,
        required: false,
        description: 'Email Template Type'
    },
    subject: {
        type: String,
        required: false,
        description: 'Email Subject'
    },
    emailBody: {
        type: String,
        required: false,
        description: 'Body of the email'
    },
    smsBody: {
        type: String,
        required: false,
        description: 'SMS Body'
    },
    organization: {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    }

}, {
    timestamps: true
});

module.exports = { name : 'CustomEmailTemplate', schema : customEmailTemplateSchema };

