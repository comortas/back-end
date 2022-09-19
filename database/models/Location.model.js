const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');
const { Schema } = mongoose;
mongoose.Promise = Promise;

const locationSchema = new Schema({
    organization : {
        type: Schema.Types.ObjectId,
        ref : 'Organization',
        required: true,
        description: 'Organization'
    },
    speciality : [{
        type: Schema.Types.ObjectId,
        ref : 'Speciality',
        required: true,
        description: 'Speciality'
    }],
    name: {
        type: String,
        required: true,
        description: 'Location Name'
    },
    description: {
        type: String,
        required: false,
        description: 'Location Description'
    },
    status: {
        type: String,
        required: true,
        enum: ['active','in_active'],
        description: 'Location Status'
    }
},
{
    timestamps: true
});

module.exports = { name : 'Location', schema : locationSchema };