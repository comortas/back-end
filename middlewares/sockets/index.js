
const _ = require('lodash');
const utility = require('../../util/utility');
var io = require('socket.io')();
const logger = require('../../util/logger');

module.exports = async () => {
  try {
    //io.use(require('../auth/socketAuthHandler'));

    io.on('connection', function (socket) {
      logger.info('socket connected! ID: ' + socket.id);
      socket.userId = socket.handshake.query.userId;
      //Add the socket to existing room created for the user
      socket.join(socket.handshake.query.userId, () => {
        logger.info(`Added socket ${socket.id} to room ${socket.handshake.query.userId}`);
      });

      socket.on("RequestToJoin", (msg) => {
        socket.to(msg.toUserId).emit(`${msg.name} requested to join the event`, msg);
      });

      socket.on("RequestApproved", (msg) => {
        socket.to(msg.toUserId).emit("Organizer accepted your request", msg);
      });

      socket.on('disconnect', async (reason) => {
        logger.info(`Socket Disconnect for user ID ${socket.handshake.query.userId} Reason: ${reason}`);
        //Leave socket from all the room to which it's connected
        socket.leaveAll();
      });
    });

    logger.info('Socket initialized');
    return io;
  } catch (err) {
    logger.error('Failed initializing sockets, ERROR: ', err);
    process.exit(1);
  }
};