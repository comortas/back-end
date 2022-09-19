const axios = require('axios');
const querystring = require('querystring');
const https = require('https');

module.exports = {

    //Make API call to specifed URL and returns the JSON response
    async makeAPICall(method, url, data, headerConfig, authType = null, authValue = null) {
        try {
            
            let header = {
                'Cache-Control': 'no-cache'
            };

            if (!headerConfig || (headerConfig && !headerConfig.contentType)) {
                header['Content-Type'] = 'application/json'
            }

            if(authType && authValue){
                header.Authorization = `${authType} ${authValue}`; 
            }

            // To change the header configuration - specific
            headerConfig ? (header = { ...header, ...headerConfig }) : (header = header);

         return await axios({
                    method,
                    url,
                    data,
                    headers: header,
                    httpsAgent: new https.Agent({ rejectUnauthorized: false })
                }).then((result) => {
                    return result.data
                }).catch((error) => {
                    throw error;
                });
        }
        catch (error) {
            throw error;
        }
    },

    async makeAPICallPostURLEncoded(url, data) {
        try {

            return await axios.post(url, querystring.stringify(data),{            
                httpsAgent: new https.Agent({ rejectUnauthorized: false })
            }).then((result) => {
                return result.data
            }).catch((error) => {
                throw error;
            });

        } catch (err) {
            throw err;
        }
    }
};