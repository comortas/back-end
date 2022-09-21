const mongoose = require('mongoose');
const Promise = require('bluebird');
const { Schema } = mongoose;
mongoose.Promise = Promise;

const volunteersSchema = new Schema({
    volunteerId: {
        type: Schema.Types.ObjectId,
        ref : 'User',
        required: true,
        description: 'User id of the volunteers'
    },
    resquestStatus: {
        type: String,
        required: true,
        description: 'Request Approved or Denied'
    }
});

module.exports = { name: 'Volunteers', schema: volunteersSchema };