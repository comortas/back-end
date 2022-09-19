const { models } = require('../DBObjects');

const getShortenUrlByLongUrl = async (longUrl) => {
    try {
        return await models.UrlShortens.findOne({ longUrl });
    } catch (err) {
        throw err;
    }
};

const getShortenUrlByCode = async (code) => {
    try {
        return await models.UrlShortens.findOne({ code });
    } catch (err) {
        throw err;
    }
};

const generateShortUrl = async (data) => {
    try {
        let urlShorten = new models.UrlShortens(data);
        await urlShorten.validate();
        await urlShorten.save();
        return urlShorten;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getShortenUrlByLongUrl,
    getShortenUrlByCode,
    generateShortUrl
}