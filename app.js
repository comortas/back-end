'use strict';

require('dotenv').config();

const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const app = express();
var server = require('http').createServer(app);
const routes = require('./routes');
const urlShortenRoute = require('./routes/urlShorten');
const port = process.env.PORT || 5050;
const SCMongoDBConnector = require('./database/SCMongoDBConnector');
const utility = require('./util/utility');
const logger = require('./util/logger');

const initApp = async () => {
  try {
    // appInsights.setup(await utility.GetSecret('INSTRUMENTATION-KEY'));
    // appInsights.start();
    //const mongoDBUrl = await utility.GetSecret('MONGODB-URI');
     const mongoDBUrl = 'mongodb://telehealth-dev-cosmos-usw2:LJMR99YxJpGvZHNsnzJwLphFH6jubzBswOVpCA1p28PBl4g1zqSTMmPocMhad5SHUsyCeeLG8uij5nYtZSmv3A==@telehealth-dev-cosmos-usw2.mongo.cosmos.azure.com:10255/TeleHealth_Dev?authSource=TeleHealth_Dev&ssl=true';
    app.set('port', port);
    app.enable('trust proxy');

    //app.use(morgan('combined', { stream: logger.stream }));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.enable('trust proxy');

    /*-----------------------------------------------------
    --Establish connection database and configure GridFS --
    -------------------------------------------------------*/
    //const scMongoDBConnector = new SCMongoDBConnector({ url : mongoDBUrl });
    //await scMongoDBConnector.connect();

    /*-----------------------------------------------------------------
    ------------- set in-memory cache and initialize socket -----------
    -------------------------------------------------------------------*/
    //const cache = await redisCache.initCache({});

    //await MDSessionHandler.init(redisCache);
    
    // const io = await initSocket(cache);
    // io.attach(server, {
    //   origins: '*:*',
    //   path: '/api/karmatheory/websocket',
    //   transports: ['websocket']
    //   // handlePreflightRequest: (req, res) => {
    //   //   const headers = {
    //   //     "Access-Control-Allow-Headers": "md-app-id",
    //   //     "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
    //   //     "Access-Control-Allow-Credentials": true
    //   //   };
    //   //   res.writeHead(200, headers);
    //   //   res.end();
    //   // }
    // });

    /*------------------------------------------
    ------------- set up routes ---------------
    --------------------------------------------*/

    app.get("/", (req, res) => {
      res.send('Welcome to Karma Theory API');
    });
    
    //const serviceBusSender = await initServiceBusClient();

    app.use('/url', await urlShortenRoute());
 
    app.use('/api/karmatheory', await routes());

    /*------------------------------------------
    ------------- Error handler ---------------
    --------------------------------------------*/

    app.use(require('./middlewares/exceptionHandler'));

    server.listen(port, (err) => {
      if (err) {
        console.error(chalk.bold.red(`Error occurred: ${err.message}`));
        process.exit(1);
      }
      logger.info(chalk.white(`Listening on localhost:${port}`));
      console.log(`Listening on localhost:${port}`);
      logger.info(chalk.green("Server started at " + new Date(Date.now())))
    });
  } catch (err) {
    console.log(`Error :: `, err);
    logger.error("Failed to initialize ", err);
    process.exit(1);
  }

};

initApp();