'use strict';
const _ = require('lodash');
const express = require('express');
const router = new express();
const communityService = require('../../services/community.service')

module.exports = async () => {

    router.post('/community', async (req, res, next) => {
        try {
            return res.json(await communityService.createNewCommunity(req.body));
        } catch (err) {
            next(err);
        }
    });

    router.put('/community/:id', async (req, res, next) => {
        try {
            return res.json(await communityService.updateCommunity(req.params.id, req.body));
        } catch (err) {
            next(err);
        }
    });

    router.get('/community', async (req, res, next) => {
        try {
            return res.json(await communityService.getCommunityById(req.query.id));
        } catch (err) {
            next(err);
        }
    });

    router.get('/community/list', async (req, res, next) => {
        try {
            return res.json(await communityService.getCommunityList(req.query.userId));
        } catch (err) {
            next(err);
        }
    });

    router.delete('/community/:id', async (req, res, next) => {
        try {
            return res.json(await communityService.deleteCommunityById(req.params.id));
        } catch (err) {
            next(err);
        }
    });

    return router;
};
