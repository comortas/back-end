const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');
const { Schema } = mongoose;
mongoose.Promise = Promise;

const consentSchema = new Schema({
    title : {
        type: String,
        required: true,
        description: 'Consent Title'
    },
    consentDetails : {
        type: String,
        required: true
    },
    organization : {
        type: Schema.Types.ObjectId,
        ref : 'Organization',
        required : true,
        description: 'Organization'
    },
    isCurrentVersion  : {
        type : Boolean,
        default : false,
        required : true
    },
    version :{
        type: Number,
        required: true,
        description: 'Version'
    },
    createdBy :{
        type: Schema.Types.ObjectId,
        ref : 'User',
        default: null,
        required: true
    },
    updatedBy : {
        type: Schema.Types.ObjectId,
        ref : 'User',
        default: null,
        required: false
    }
},
{
    timestamps: true
});

module.exports = { name : 'Consent', schema : consentSchema };