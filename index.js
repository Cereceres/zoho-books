const request = require('request');

const parseAuthToken = require('./lib/parse-auth-token');
const Core = require('./lib/core-class');
const getOptionsToGetToken = require('./lib/get-options-to-auth-token');
const parseBody = require('./lib/parse-body');
const parseData = require('./lib/parse-data');
const baseUrl = 'https://books.zoho.com/api/v3';

class ZohoBooks extends Core {
    constructor(options) {
        super();
        this.options = options || {};
    }
    createToken(email, password) {
        const options = getOptionsToGetToken(email, password);
        return new Promise((resolve, reject) => request.get(options, (err, res, body) => {
            if (err || res && res.error) return reject(err || res && res.error);

            resolve(parseBody(body));
        }))
            .then(parseAuthToken(this));
    }

    api(url, method, _data) {
        const data = _data || {};

        const qs = {
            authtoken: this.options.authtoken,
            organization_id: this.options.organization
        };

        parseData(data, qs);

        if (Object.keys(data).length) qs.JSONString = JSON.stringify(data);

        return ZohoBooks._request((this.options.host || baseUrl) + url, method, qs)
            .then((res) => res.code === 0 ? Promise.resolve(res) : Promise.reject(res));
    }
}

module.exports = ZohoBooks;
