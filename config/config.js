const env = process.env.NODE_ENV || 'dev';
const tenantId = process.env.TENANT_ID || '72b17115-9915-42c0-9f1b-4f98e5a4bcd2';

const config = {
    env: env,
    appInsightsKey: process.env.APP_INSIGHTS_KEY || '41e54e30-3c03-4815-a94c-250687ee2273',
    PORT: process.env.PORT || 9001,
    LOGGING: {
        LOG_LEVEL: process.env.LOG_LEVEL || 'info',
        LOG_DIR: 'logs'
    },
    oauth: {
        clientId: process.env.CLIENT_ID || '90feea19-8057-4376-9e58-24fc7ebc4241',
        redirectUri: process.env.REDIRECT_URI || 'http://localhost:8080/auth',
        resource: process.env.RESOURCE || 'api://51838731-9379-4856-b048-be570377218b',
        clientSecret: process.env.CLIENT_SECRET || 'GC1rsw2ds=:F[jgoQeuHr?cGtv700[Eb',
        tokenEndpoint: `https://login.microsoftonline.com/${tenantId}/oauth2/token`
    }
};

module.exports = config;