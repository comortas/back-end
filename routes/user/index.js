'use strict';
const _ = require('lodash');
const express = require('express');
const router = new express();
const userService = require('../../services/user.service');

module.exports = async () => {

    router.post('/user', async (req, res, next) => {
        try {
            return res.json(await userService.createNewUser(req.decoded.payload));
        } catch (err) {
            next(err);
        }
    });

    router.put('/user/:id', async (req, res, next) => {
        try {
            return res.json(await userService.updateUser(req.params.id, req.body));
        } catch (err) {
            next(err);
        }
    });

    router.get('/user', async (req, res, next) => {
        try {
            return res.json(await userService.getuserById(req.query.id));
        } catch (err) {
            next(err);
        }
    });

    router.get('/user/list', async (req, res, next) => {
        try {
            return res.json(await userService.getuserList());
        } catch (err) {
            next(err);
        }
    });

    router.delete('/user/:id', async (req, res, next) => {
        try {
            return res.json(await userService.deleteuserById(req.params.id));
        } catch (err) {
            next(err);
        }
    });

    router.put('/requestacknowledge/:id', async(req,res,next) =>{
        try{
            return res.json(await userService.updateWallet(req.params.id,req.body.wallet));
        }catch (err) {
            next(err);
        }        
    });
    
    return router;
};
