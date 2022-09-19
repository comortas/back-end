const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');
const { Schema } = mongoose;
mongoose.Promise = Promise;


const consentAcknowledgementSchema = new Schema({
    consentId : {
        type: Schema.Types.ObjectId,
        ref : 'Consent',
        required: true
    },
    appointmentId : {
        type: Schema.Types.ObjectId,
        ref : 'Appointment',
        required: true
    },
    appointmentDate : {
        type: Date,
        required: true
    },
    acknowledgementDate : {
        type: Date,
        required: true
    },
    acknowledgementStatus : {
        type: String,
        required: true,
        description: 'Status of the acknowledgement',
        enum: ['agree', 'disagree'],
    },
    participantId: {
        type: Schema.Types.ObjectId,
        required: true
    }
},
{
    timestamps: true
});

module.exports = { name : 'ConsentAcknowledgement', schema : consentAcknowledgementSchema };