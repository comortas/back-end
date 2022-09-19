const Joi = require('joi');
const constants = require('../../../util/constants');
const { join } = require('bluebird');
const schemas = {
    //Auth Controller - Starts
    getFileSchema: Joi.object({
        fileId: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId').required()
    }),
    getCertificateImageSchema: Joi.object({
        certificateId: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId').required()
    }),

    //Auth Controller - Ends

    //Socket - Starts
    socketSchema: Joi.object({
        userId: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId').required(),
        EIO: Joi.string(),
        'md-app-id': Joi.string().required(),
        //To be uncommented when adding access token validation as well in tha socket connection
        //'md-access-token': Joi.string().required(),
        transport: Joi.string()
    }),
    //Socket - Ends

    // Canned message Controller - Starts
    getCannedMessageByTitle : Joi.object({
        title : Joi.string().required()
    }),
    getCannedMessageByCategory : Joi.object({
        category : Joi.string().required()
    }),
    getCannedMessagesByOrganizationAndLocation : Joi.object({
        organization : Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId'),
        clinicLocation : Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId'),
    }),
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
    updateCannedMessage: Joi.object( {
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
    }),
    deleteCannedMessage : Joi.object({
        id: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId').required()
    }),

    getAllCannedMessages : Joi.object().keys({
        organization: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId')),
        associatedTo: Joi.array().items(Joi.string()).allow('').allow(null) 
    }),
    // Canned message Controller - Ends

    // Consent Controller ---Starts
    createConsentSchema: Joi.object().keys({
        title: Joi.string().required(),
        consentDetails: Joi.string().required(),
        organization: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId').required()
    }),

    getConsentByVersionSchema : Joi.object({
        version : Joi.number().required()
    }),
    // Consent Controller ---Ends

    // Health bot DC controller --Starts
    getConsentSchema: Joi.object({
        appointmentId: Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId').required()
    }),

    createConsentAcknowledgementSchema: Joi.object().keys({
        consentId : Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId').required(),
        appointmentId : Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId').required(),
        acknowledgementStatus : Joi.string().valid('agree', 'disagree').required()
    }),
    // Health bot DC controller --Ends

    //Email Template Controller --Starts

    getCustomEmailTemplateSchema : Joi.object({
        templateId :Joi.number(),
        orgId : Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId')
    }),
    updateCustomEmailTemplateSchema: Joi.object({
        params: Joi.object({
            templateId :Joi.number(),
            orgId : Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId').required()
        }),
        body: Joi.object({
            subject: Joi.string(),
            emailBody : Joi.string(),
            smsBody: Joi.string()
        }).or('emailBody','smsBody')
    }),
    getTemplatePlaceHolderSchema : Joi.object({
        templateId: Joi.number().required()
    }),
    getAllCustomEmailTemplatesSchema : Joi.object({
        orgId : Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'ObjectId').required()
    }),

    //Email Template Controller --Starts

    // Reporting Controller --Starts
    getPowerBiReportSchema : Joi.object({
        workspaceId : Joi.string().regex(/^[a-zA-Z0-9-]+$/).required(),
        reportId : Joi.string().regex(/^[a-zA-Z0-9-]+$/).required()
    }),
    // Reporting Controller --Ends

};
module.exports = schemas;