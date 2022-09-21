const mongoose = require('mongoose');
const Promise = require('bluebird');
const { Schema } = mongoose;
mongoose.Promise = Promise;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        description: 'Name of the user'
    },
    email: {
        type: String,
        required: true,
        description: 'email of the user'
    },
    phone: {
        type: String,
        required: false,
        description: 'phone of the user'
    },
    wallet: {
        type: Number,
        required: false,
        description: 'credit hours of the user'
    },
    profilePicture : {
        type: String,
        required: false,
        description: 'User Profile picture'
    }
},
    {
        timestamps: true
});

module.exports = { name : 'User', schema : userSchema };