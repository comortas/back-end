const config = {
    PORT: process.env.PORT || 9001,
    LOGGING: {
        LOG_LEVEL: process.env.LOG_LEVEL || 'info',
        LOG_DIR: 'logs'
    }
};

module.exports = config;