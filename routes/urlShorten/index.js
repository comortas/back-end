const express = require('express');
const router = express.Router();

const urlShortenService = require('../../services/urlshorten.service');

module.exports = async () => {

    router.get('/:code', async (req, res, next) => {

        try {

            let shortenUrl = await urlShortenService.getShortenUrlByCode(req.params.code);
            return res.redirect(shortenUrl.longUrl);

        } catch (err) {

            next(err);

        }

    });

    return router;

}