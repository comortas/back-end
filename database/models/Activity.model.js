const mongoose = require('mongoose');
const Promise = require('bluebird');
const { Schema } = mongoose;
mongoose.Promise = Promise;

const activitySchema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['event','help'],
        description: 'Type of the activity'
    },
    name: {
        type: String,
        required: true,
        description: 'Name of the activity'
    },
    description: {
        type: String,
        required: true,
        description: 'agenda about the activity'
    },
    location: {
        type: String,
        required: true,
        description: 'Location of the activity'
    },
    latitude: {
        type: String,
        required: true,
        description: 'Latitude of the activity'
    },
    longitude: {
        type: String,
        required: true,
        description: 'Latitude of the activity'
    },
    duration: {
        type: Number,
        required: true,
        description: 'duration of the activity'
    },
    date: {
        type: String,
        required: true,
        description: 'date of the activity'
    },
    noOfVolunteers:{
        type: Number,
        required: true,
        description: 'duration for the activity'
    },
    poc: {
        type: String,
        required: true,
        description: 'point of contact for the activity'
    },
    status: {
        type: String,
        required: true,
        enum: ['open','closed'],
        description: 'status of the activity'
    },
    approvedVolunteers : [{
        type: Schema.Types.ObjectId,
        ref : 'User',
        required: true,
        description: 'User id of the volunteers'
    }],
    createdBy: {
        type: String,
        required: true,
        description: 'User who created the activity'
    }
},
    {
        timestamps: true
});

module.exports = { name : 'Activity', schema : activitySchema };