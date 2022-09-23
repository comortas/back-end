
//App Constants
module.exports = {
    HTTP_STATUS_CODE: {
        SUCCESS: 200,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        INTERNAL_SERVER_ERROR: 500
    },
    ACTIVITY_REQUEST_STATUS: {
        OPEN: 'open',
        REQUEST_DENIED: 'request-denied',
        REQUEST_APPROVED: 'request-approved',
        CREDIT_DENIED: 'credit-denied',
        CREDIT_APPROVED: 'credit-approved'
    }

    //'open', 'request-approved', 'request-denied', 'credit-approved', 'credit-denied'
};