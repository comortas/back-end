const logger = require('../../util/logger');
module.exports = async function (err, req, res, next) {

    // added this line to include winston logging
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}  - ${err.stack}`);
    console.error(err);

    if (err.isBoom) {
        return res.status(err.output.statusCode)
            .json({ message: err.message, data: err.data });
    }

    // if (err.message.includes('validation failed')) {
    //   return res.status(400).json({ message: err.message });
    // }

    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err);
    var exceptionMessage = '';
    if (err.response != null && err.response.data.error) {
        exceptionMessage = 'Telehealth-BE :' + err.response.data.error;
    } else if (err.response != null && err.response.data.message) {
        exceptionMessage = 'Telehealth-BE :' + err.response.data.message;
    } else if (err.message) {
        exceptionMessage = err.message;
    }

    // render the error page
    return res.status(500).json(
        {
            message: "Something went wrong, please try again after some time",
            exceptionMessage: exceptionMessage
        });
}