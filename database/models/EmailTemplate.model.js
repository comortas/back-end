
const mongoose = require('mongoose');
const Promise = require('bluebird');
const { Schema } = mongoose;
mongoose.Promise = Promise;


const emailTemplateSchema = new Schema({

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
  }

}, {
    timestamps: true
  });

module.exports = { name : 'EmailTemplate', schema : emailTemplateSchema };
