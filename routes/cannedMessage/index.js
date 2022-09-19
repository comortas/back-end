'use strict';

const _ = require('lodash');
const express = require('express');
const Boom = require('@hapi/boom');
const router = new express();
const reqHandler = require('../../middlewares/reqValidator');
const schemas = require('../../middlewares/reqValidator/schemas/reqSchemas');

const cannedMessageService = require('../../services/cannedMessage.service')

module.exports = async () => {

    router.get('/getAllCannedMessages', async (req, res, next) => {
        try {

            return res.json(await cannedMessageService.getAllCannedMessages(req.role,req.organization,req.query.organization));

        } catch (err) {
            next(err);
        }
    });

    router.post('/getAllCannedMessages',reqHandler(schemas.getAllCannedMessages,'body'), async (req, res, next) => {
        try {

            return res.json(await cannedMessageService.getAllCannedMessagesSub(req.role,req.organization,req.body.organization,req.body.associatedTo));

        } catch (err) {
            next(err);
        }
    });

    // Not used API
    /*router.get('/getCannedMessageByTitle/:title', reqHandler(schemas.getCannedMessageByTitle, 'params'), async (req,res,next) => {
        try{
            return res.json(await cannedMessageService.getCannedMessageByTitle(req.params.title));
        }catch (err) {
            next (err);
        }
    });

    router.get('/getCannedMessageByCategory/:category', reqHandler(schemas.getCannedMessageByCategory, 'params'), async (req,res,next) => {
        try{
            return res.json(await cannedMessageService.getCannedMessageByCategory(req.params.category));
        }catch (err) {
            next (err);
        }
    });

    router.get('/getCannedMessagesByOrganization',  async (req,res,next) => {
        try{
            return res.json(await cannedMessageService.getCannedMessagesByOrganization(req.userId));
        }catch (err) {
            next (err);
        }
    });*/

    router.get('/getCannedMessage',  async (req,res,next) => {
        try{
            return res.json(await cannedMessageService.getCannedMessage(req.userId));
        }catch (err) {
            next (err);
        }
    });

    router.post('/cannedMessage', actionPermit('canned_message'), reqHandler(schemas.createCannedMessage,'body'),async (req,res,next) => {
        try{
            const languageCode = req.headers['language'];
            return res.json(await cannedMessageService.createCannedMessage(languageCode,req.userId,req.body));
        }catch(err){
            next (err);
        }
    });

    router.patch('/cannedMessage/:id', actionPermit('canned_message'), reqHandler(schemas.updateCannedMessage,'req'),async (req,res,next) => {
        try{
            const languageCode = req.headers['language'];
            return res.json(await cannedMessageService.updateCannedMessage(languageCode,req.userId,req.params.id,req.body));
        }catch(err){
            next (err);
        }
    });

    router.delete('/cannedMessage/:id',actionPermit('canned_message'), reqHandler(schemas.deleteCannedMessage,'params'),async(req,res,next) => {
       try{
           const languageCode = req.headers['language'];
           return res.json(await cannedMessageService.deleteCannedMessage(languageCode,req.params.id));
       } catch(err){
           next (err);
       }
    });

    
    return router;
};
