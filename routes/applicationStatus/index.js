'use strict';

const _ = require('lodash');
const express = require('express');
const router = new express();

module.exports = async () => {

    router.get('/', async (req, res, next) => {
        try {

            return res.json("Success");

        } catch (err) {
            next(err);
        }
    });    
    return router;
};
