const Boom = require('@hapi/boom');
const crypto = require("crypto");
const querystring = require("querystring");
const defaultTTL = 60; //in seconds
const signedUrlSecret = process.env.SIGNED_URL_SECRET;

exports.signUrl = (url, options = {}) => {

    const data = {
        r: Math.floor(Math.random() * 10000000000).toString()
    };
    const exp = (options.ttl ? Math.ceil(+new Date() / 1000) + options.ttl : null) ||
        options.exp ||
        (defaultTTL ? Math.ceil(+new Date() / 1000) + defaultTTL : null);

    if (exp) {
        data.e = exp;
    }
    if (options.addr) {
        data.a = options.addr;
    }
    if (options.method) {
        data.m = (Array.isArray(options.method) ? options.method.join(',') : options.method).toUpperCase();
    }
    const signatureStr = (url.indexOf('?') == -1 ? '?' : '&') + querystring.stringify(data, '&', '=') + '&';
    url += signatureStr;
    const hash = crypto.createHash('sha256');
    hash.update(signatureStr, 'utf8');
    hash.update(signedUrlSecret.toString());
    url += `sig=${hash.digest('hex')}`;
    return url;
};

exports.verifyUrl = () => {
    return function (req, res, next) {
        try {
            var signatureStr = '?' + req.url.split('?')[1];
            signatureStr = signatureStr.split('sig')[0];
            const queryParams = querystring.parse(req.url, '&', '=');

            if (!verifyString(queryParams.sig, signatureStr)) {
                throw Boom.notFound(`Invalid URL`);
            }

            // check additional conditions
            if (queryParams.a && queryParams.a != req.get('host')) {
                throw Boom.notFound(`Invalid URL`);
            }
            if (queryParams.m && queryParams.m.indexOf(req.method) == -1) {
                throw Boom.notFound(`Invalid URL`);
            }
            if (queryParams.e && queryParams.e < Math.ceil(+new Date() / 1000)) {
                throw Boom.notFound(`URL Expired`);
            }
            next();
        }
        catch (error) {
            throw error;
        }
    }
};

const verifyString = (signature, str) => {
    const hash = crypto.createHash('sha256');
    hash.update(str, 'utf8');
    hash.update(signedUrlSecret.toString());
    const tempHash = hash.digest('hex');
    if (tempHash == signature) {
        return true;
    }
    return false;
};

