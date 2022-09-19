const appId = process.env.CLIENT_ID || 'c7dc39de-7b9f-4d1c-9773-5e5285af9ea9';

module.exports = function (req, res, next) {
    var appIdFromReq = req.headers['md-app-id'];
    //if ((req.path.toLowerCase().includes('/getprofileimage') || appIdFromReq === appId)) {
    if (appIdFromReq === appId) {
        req.clientId = appIdFromReq;
        next(); // App id is allowed, so continue on the next middleware
    }
    else {
        res.status(403).json({ error: 'Not Allowed. Invalid application ID' });
    }
};