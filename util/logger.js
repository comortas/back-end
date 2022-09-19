/**
 * Logger Configuration
 */
const winston = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');

const config = require('../config/config');

// Create the directory if it does not exist
if (!fs.existsSync(config.LOGGING.LOG_DIR)) {
    fs.mkdirSync(config.LOGGING.LOG_DIR);
}

const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level.toUpperCase()}: ${message}`;
});

const applicationTransport = new winston.transports.DailyRotateFile({
    filename: path.join(config.LOGGING.LOG_DIR, `application-%DATE%.log`),
    datePattern: 'YYYY-MM-DD',
    level: 'debug',
    maxSize: '15m'
});

const errorTransport = new winston.transports.DailyRotateFile({
    filename: path.join(config.LOGGING.LOG_DIR,`error-%DATE%.log`),
    datePattern: 'YYYY-MM-DD',
    level: 'error',
    maxSize: '15m'
});

const uncaughtExceptionsTransport = new winston.transports.DailyRotateFile({
    filename: path.join(config.LOGGING.LOG_DIR,`uncaught_exception-%DATE%.log`),
    datePattern: 'YYYY-MM-DD',
    maxSize: '15m'
});

const logger = winston.createLogger({
    level: config.LOGGING.LOG_LEVEL,
    format: winston.format.combine(
        winston.format.timestamp(),
        logFormat
    ),
    transports: [
        applicationTransport,
        errorTransport,
        new winston.transports.Console()
    ],
    exceptionHandlers: [
        uncaughtExceptionsTransport,
        new winston.transports.Console()
    ]
});

// Do not exit application if uncaughtExceptions occurs
logger.exitOnError = false;

module.exports = logger;