const CLIENT_ID = process.env.CLIENT_ID || '200442052840-m0p7uol2elp8hhf2i2e8i22htkdrjphs.apps.googleusercontent.com';
const messages = require('../../util/message');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);
const constants = require("../../util/constants");
const logger = require('../../util/logger');

module.exports = function (req, res, next){
    let token = req.headers['authorization'] || req.headers['Authorization'];
    if (token && token.startsWith('Bearer ') && token.split(' ')[1]) {
        token = token.split(' ')[1];
        // client.verifyIdToken({
        //     idToken: token,
        //     audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // })
        client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        }, function (err, decoded) {
            if (err) {
                return res.status(constants.HTTP_STATUS_CODE.UNAUTHORIZED).send({                   
                    message: messages.ErrorMessage.InvalidToken
                });
            }
            else {
                logger.info(JSON.stringify(decoded));
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(constants.HTTP_STATUS_CODE.UNAUTHORIZED).send({
            message: messages.ErrorMessage.MissingToken
        });
    }
};