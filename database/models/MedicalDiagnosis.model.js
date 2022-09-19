const mongoose = require('mongoose');
const _ = require('lodash');
const { Schema } = mongoose;

const medicalDiagnosisSchema = new Schema({    
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    appointmentId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    symptoms: {
        type : Schema.Types.Mixed
    },
    possibleCauses : [{
        type : Schema.Types.Mixed,
    }],
    displayMessage : {
        type : Schema.Types.Mixed
    }
},
{    
    timestamps: true,
});

module.exports = { name : 'MedicalDiagnosis', schema : medicalDiagnosisSchema };