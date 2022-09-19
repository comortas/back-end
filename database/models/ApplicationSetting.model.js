const mongoose = require('mongoose');

var { Schema } = mongoose;

var appSettingSchema = new Schema({

    name: { 
        type: String, 
        required: true 
    },
    displayName: { 
        type: String, 
        required: true 
    },
    value: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: false 
    }
},
{
    timestamps: true
});

module.exports = { name : 'ApplicationSetting', schema : appSettingSchema };