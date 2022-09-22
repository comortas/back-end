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

    router.get('/user/:id', async (req, res, next) => {
        try {
            return res.json(await userService.getUserById(req.params.id));
        } catch (err) {
            next(err);
        }
    });

    router.get('/user/list', async (req, res, next) => {
        try {
            return res.json(await userService.getUserList());
        } catch (err) {
            next(err);
        }
    });

    router.delete('/user/:id', async (req, res, next) => {
        try {
            return res.json(await userService.deleteUserById(req.params.id));
        } catch (err) {
            next(err);
        }
    });

    router.post('/user/acknowledge', async(req,res,next) =>{
        try{
            return res.json(await userService.updateWallet(req.body));
        }catch (err) {
            next(err);
        }        
    });
    
    return router;
};
