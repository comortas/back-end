const express = require('express');
const router = express.Router();

const urlShortenService = require('../../../services/urlshorten.service');

module.exports = async () => {

    router.post('/url/generate', async (req, res, next) => {

        try {

            return res.json(await urlShortenService.generateShortUrl(req.body.longUrl)); 

        }
        catch (err) {

            next(err);

        }
        
    });

    return router;

}