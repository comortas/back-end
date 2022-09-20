'use strict';

const _ = require('lodash');
const express = require('express');
const router = new express();
const communityService = require('../../services/community.service')

module.exports = async () => {

    router.post('/community/create', async (req, res, next) => {
        try {            
            return res.json(await communityService.createNewCommunity(req.body));
        } catch (err) {
            next(err);
        }
    });
    return router;
};
