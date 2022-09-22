'use strict';
const _ = require('lodash');
const express = require('express');
const router = new express();
const activityService = require('../../services/activity.service')

module.exports = async () => {

    router.post('/activity', async (req, res, next) => {
        try {
            return res.json(await activityService.createNewActivity(req.body));
        } catch (err) {
            next(err);
        }
    });

    router.put('/activity/:id', async (req, res, next) => {
        try {
            return res.json(await activityService.updateActivity(req.params.id, req.body));
        } catch (err) {
            next(err);
        }
    });

    router.get('/activity', async (req, res, next) => {
        try {
            return res.json(await activityService.getActivityById(req.query.id));
        } catch (err) {
            next(err);
        }
    });

    router.get('/activity/list', async (req, res, next) => {
        try {
            return res.json(await activityService.getActivityList());
        } catch (err) {
            next(err);
        }
    });

    router.delete('/activity/:id', async (req, res, next) => {
        try {
            return res.json(await activityService.deleteActivityById(req.params.id));
        } catch (err) {
            next(err);
        }
    });


    router.get('/activity/:id/optin', async (req, res, next) => {
        try {
            return res.json(await activityService.getActivityList());
        } catch (err) {
            next(err);
        }
    });

    router.post('/activity/apply', async (req, res, next) => {
        try {
            return res.json(await activityService.applyRequest(req.body));
        } catch (err) {
            next(err);
        }
    });
    router.post('/activity/approveordeny', async (req, res, next) => {
        try {
            return res.json(await activityService.approveOrDenyRequest(req.body));
        } catch (err) {
            next(err);
        }
    });
  

    return router;
};
