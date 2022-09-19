const Boom = require('@hapi/boom');
const validUrl = require('valid-url');
const shortId = require('shortid');
const message = require('../util/message');
const urlShortenDao = require('../database/dao/urlShortenDao');

const generateShortUrl = async (longUrl) => {
    try {

        if (!longUrl) {
            throw Boom.badRequest(message.ErrorMessage.MissingInput);
        }

        else if (!validUrl.isUri(longUrl)) {
            throw Boom.badRequest(message.ErrorMessage.InvalidURL);
        }

        let shortenUrl = await urlShortenDao.getShortenUrlByLongUrl(longUrl);
        if (shortenUrl) {
            return shortenUrl;
        }
        // Generate Short URL
        let code = shortId.generate();
        let shortUrl = process.env.SHORT_URL_DOMAIN + '/url/' + code;
        let urlShorten = {
            code,
            shortUrl,
            longUrl
        };
        shortenUrl = await urlShortenDao.generateShortUrl(urlShorten);
        return shortenUrl;

    } catch (err) {
        throw err;
    }
};

const getShortenUrlByCode = async (code) => {
    try {
        if (!code) {
            return { message: "Success" };
        }
        return await urlShortenDao.getShortenUrlByCode(code);
    } catch (err) {
        throw err;
    }
};

module.exports = {
    generateShortUrl,
    getShortenUrlByCode
}