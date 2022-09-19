const mongoose = require('mongoose');
const Promise = require('bluebird');
const { Schema } = mongoose;
mongoose.Promise = Promise;

const cannedMessageSchema = new Schema({
    title: {
        type: String,
        required: true,
        description: 'Title of the canned message'
    },
    message: {
        type: String,
        required: true,
        description: 'Canned message'
    },
    category: {
        type: String,
        required: true,
        description: 'Category of the Canned message'
    },
    associatedTo: [{
        type: String,
        required: false,
        description: 'Associated to users with roles'
    }],
    organization : {
        type: Schema.Types.ObjectId,
        ref: 'Organization',
        default: null,
        required: false
    },
    clinicLocation :[{
        type: Schema.Types.ObjectId,
        ref: 'Location',
        default: null,
        required: false
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
        required: false
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
        required: false
    }
}, 
{
    timestamps: true
});

module.exports = { name : 'CannedMessage', schema : cannedMessageSchema };