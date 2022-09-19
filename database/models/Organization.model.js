const mongoose = require('mongoose');
const Promise = require('bluebird');
const _ = require('lodash');
const { Schema } = mongoose;
mongoose.Promise = Promise;
const signedUrlVerifier = require('../../middlewares/auth/signedUrlVerifier');

const organizationSchema = new Schema({
    
    name: {
        type: String,
        required: true,
        description: 'Organization Name'
    },
    description: {
        type: String,
        required: false,
        description: 'Organization Description'
    },
    status: {
        type: String,
        required: true,
        enum: ['active','in_active'],
        description: 'Organization Status'
    },
    isRestricted : {
        type: Boolean,
        default: false,
        required : true
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: 'Images',
        default: null,
        required: false
    },
    languageCode : {
        type: String,
        required : false
    }
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

organizationSchema.plugin(require('mongoose-lean-virtuals'));

organizationSchema.virtual('imageUrl').get(function () {
    if(this.image){
        return signedUrlVerifier.signUrl(`${process.env.APPLICATION_URL}/api/telehealth/signed/file/${this.image}`, { ttl: 18000 });
    }else{
        return null;
    }
});

module.exports = { name : 'Organization', schema : organizationSchema };