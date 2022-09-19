
const _ = require('lodash');
const redis = require('socket.io-redis');
const mdCommonModule = require('@apollo/md-common-services-dev');
const utility = require('../../util/utility');
var io = require('socket.io')();

module.exports = async (cache) => {
  const logger = await mdCommonModule.getLogger();
  try {
    const redisHost = await utility.GetSecret('REDIS-HOST');
    //  const redisHost = '20.119.75.31'; // Uncomment to run in local

    //io.set('origins', '*:*');

    io.adapter(redis({
      port: process.env.REDIS_PORT || 6379, host: redisHost,
      password: await utility.GetSecret('REDIS-PASSWORD')
    }));
    logger.info('Socket-Redis Adapter attached');

    io.use(require('../auth/socketAuthHandler'));

    io.on('connection', function (socket) {
      logger.info('socket connected! ID: ' + socket.id);

      try {
        logger.info(`IP address from x-forwarded-for:${socket.handshake.headers["x-forwarded-for"].split(",")[0]} , User ID: ${socket.handshake.query.userId}`);

      }
      catch (err) {

      }

      socket.userId = socket.handshake.query.userId;
      //Check if user already there in cache
      cache.get(socket.handshake.query.userId, function (err, reply) {
        logger.info('reply ' + reply);
        //If connections already exists, add the new socket id to the existing user data
        if (reply) {
          logger.info(`Adding new socket connection to existing user ${socket.handshake.query.userId}`);
          let userData = JSON.parse(reply);
          userData.sockets.push(socket.id);

          var user = {
            sockets: userData.sockets,
            userId: socket.handshake.query.userId
          };
          cache.set(user.userId, JSON.stringify(user));
        } else {
          //If connections not there,add a new entry for the user
          logger.info(`Adding new socket connection to new user ${socket.handshake.query.userId}`);
          let sockets = [socket.id];
          var user = {
            sockets,
            userId: socket.handshake.query.userId
          };

          cache.set(user.userId, JSON.stringify(user));
        }

        //Add the socket to existing room created for the user
        socket.join(socket.handshake.query.userId, () => {
          logger.info(`Added socket ${socket.id} to room ${socket.handshake.query.userId}`);
        });

      });

      socket.on('disconnect', async (reason) => {
        logger.info(`Socket Disconnect for user ID ${socket.handshake.query.userId} Reason: ${reason}`);

        //Get the user's data from cache 
        cache.get(socket.handshake.query.userId, function (err, reply) {
          if (reply) {
            let userData = JSON.parse(reply);
            //If user has multiple socket connections, then just update the cache
            if (userData.sockets && userData.sockets.length > 1) {
              logger.info(`User has multiple connections, Sockets: `, userData.sockets);

              _.remove(userData.sockets, function (socketId) {
                return socketId === socket.id;
              });

              var user = {
                sockets: userData.sockets,
                userId: socket.handshake.query.userId
              };
              cache.set(user.userId, JSON.stringify(user));
              logger.info('Updated on disconnection ', user.userId);

              //Leave socket from all the room to which it's connected
              socket.leaveAll();

            } else {
              //Delete user from cache if only one socket connection is there
              cache.del(socket.handshake.query.userId, function (err, reply) {
                logger.info('Deleted from cache ', socket.handshake.query.userId);
              });

              //Identify/Handle differentiation between browser page refresh and tab close on socket disconnection
              setTimeout(() => {
                cache.get(socket.handshake.query.userId, function (err, reply) {
                  if (reply) {
                    logger.info(`User ${socket.handshake.query.userId} again connected over socket. So no need to clear existing JWT in DB`);

                  } else {
                    //Leave socket from all the room to which it's connected
                    socket.leaveAll();
                  }
                });
              }, 20000);
            }
          }
        });
      });

    });

    logger.info('Socket initialized');
    return io;
  } catch (err) {
    logger.error('Failed initializing sockets, ERROR: ', err);
    process.exit(1);
  }
};



