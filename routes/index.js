'use strict';
const express = require('express');
const initCommunity = require('./community');
const initActivity = require('./activity');
const initUser = require('./user');

const internals = module.exports = async (io) => {

  const communityRoute = await initCommunity();
  const activityRoute = await initActivity(io);
  const userRoute = await initUser();
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
  router.use(userRoute);
  router.use(communityRoute);
  router.use(activityRoute);
  return router;
};