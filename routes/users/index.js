'use strict';

const _ = require('lodash');
const express = require('express');
const Boom = require('@hapi/boom');
const router = new express();
//const reqHandler = require('../../middlewares/reqValidator');
//const schemas = require('../../middlewares/reqValidator/schemas/reqSchemas');

const usersService = require('../../services/users.service')

module.exports = async () => {

    router.get('/getAllUsers', async (req, res, next) => {
        try {
            return res.json(await usersService.getAllUsers());
        } catch (err) {
            next(err);
        }
    });

    router.post('/getAllCreatedUsers',reqHandler(schemas.getAllCreatedUsers,'body'), async (req, res, next) => {
        try {
            return res.json(await usersService.getAllCreatedUsers());
        } catch (err) {
            next(err);
        }
    });

    return router;
};
