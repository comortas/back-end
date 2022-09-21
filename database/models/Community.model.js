const mongoose = require('mongoose');
const Promise = require('bluebird');
const { Schema } = mongoose;
mongoose.Promise = Promise;

const communitySchema = new Schema({
    name: {
        type: String,
        required: true,
        description: 'Name of the Community'
    },
    description: {
        type: String,
        required: true,
        description: 'Brief about the Community'
    },
    category: {
        type: String,
        required: true,
        description: 'category of the Community'
    },
    location: {
        type: String,
        required: true,
        description: 'Location of the Community'
    },
    latitude: {
        type: String,
        required: true,
        description: 'Latitude of the Community'
    },
    longitude: {
        type: String,
        required: true,
        description: 'Latitude of the Community'
    },
    createdBy: {
        type: String,
        required: true,
        description: 'User who create the Community'
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        description: 'User id of the members'
    }],
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        description: 'Admin of the Community'
    }
},
    {
        timestamps: true
    });

module.exports = { name: 'Community', schema: communitySchema };