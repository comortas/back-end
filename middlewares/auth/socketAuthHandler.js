const jwt = require("jsonwebtoken");
const Joi = require('joi');
const schemas = require('../reqValidator/schemas/reqSchemas');
//const utility = require('../../util/utility');
const constants = require('../../util/constants');

const appId = process.env.CLIENT_ID || 'c7dc39de-7b9f-4d1c-9773-5e5285af9ea9';

module.exports = async function (socket, next) {
  const logger = await mdCommonModule.getLogger();
  if (!socket.handshake.query['md-app-id'] || socket.handshake.query['md-app-id'].toString() != appId) {
    logger.error('Invalid App ID');
    socket.disconnect();
    next(new Error('Socket Authentication error : App-Id missing/invalid'));
  } else {
    const result = Joi.validate(socket.handshake.query, schemas.socketSchema);
    const { value, error } = result;
    const valid = error == null;
    if (!valid) {
      logger.error("Validation Failed: " + error.message);
      socket.disconnect();
      next(new Error('Socket Validation error'));
    } else {      
      next();
    }
  }

};