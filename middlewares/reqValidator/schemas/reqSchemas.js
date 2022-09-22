const Joi = require('joi');
const schemas = {

    createCannedMessage: Joi.object().keys({
        title : Joi.string().required(),
        message : Joi.string().required(),
        category : Joi.string().required(),
        associatedTo : Joi.array().items(Joi.string()),
        organization : Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId'),
        clinicLocation: Joi.array().items(
            Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId')
        ).unique()
    }),
    updateCannedMessage: Joi.object({
        params: Joi.object({
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId').required()
        }),
        body: Joi.object({
            title : Joi.string(),
            message : Joi.string(),
            category : Joi.string(),
            associatedTo : Joi.array().items(Joi.string()),
            organization : Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId'),
            clinicLocation: Joi.array().items(
                Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId')
            ).unique()
        })
    })
};
module.exports = schemas;