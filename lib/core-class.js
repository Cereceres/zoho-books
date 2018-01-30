const request = require('request');

const statusCodeValid = new Set([ 200, 201, 204 ]);

module.exports = class {
    static _request(url, method, qs) {
        const toSend = {
            method,
            uri: url,
            json: true
        };
        if (qs) {
            toSend.qs = qs;
        }
        return new Promise((resolve, reject) => {
            request(toSend, (error, res, body) => {
                const isInvalidResponse = error || !statusCodeValid.has(Number(res.statusCode));
                if (isInvalidResponse) return reject(error || body);

                resolve(body);
            });
        });
    }
};
