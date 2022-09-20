'use strict';
const express = require('express');

const initAppStatusRoute = require('./applicationStatus');
const initFileRoute = require('./file');
//const initCannedMessageRoute = require('./cannedMessage');
const initGenerateShortUrl = require('./urlShorten/generateShortUrl');

const internals = module.exports = async (mdCommonModule) => {

  const fileRoute = await initFileRoute();
  //const cannedMessageRoute = await initCannedMessageRoute();  
  const generateShortUrlRoute = await initGenerateShortUrl();
  const appStatusRoute = await initAppStatusRoute();


  const router = new express.Router();

  router.get('/ping', async (req, res) => res.json({ message: 'pong' }));


  /* Application ID verification - Middleware*/
  //router.use(require("../middlewares/auth/clientVerificationHandler"));

  //const middlewares = mdCommonModule.getMiddlewares();
  // const authHandler = new middlewares.AuthHandler({
  //     algorithms: ['RS256'],
  //     issuer: process.env.AUTH_URL,
  //     audience: 'MD-Common-Service-API'
  // });

  /* Application ID verification - Middleware*/
  router.use(require("../middlewares/auth/clientVerificationHandler"));
  router.use(appStatusRoute);
  router.use(fileRoute);
  //router.use(cannedMessageRoute);
  router.use(generateShortUrlRoute);
  return router;
};