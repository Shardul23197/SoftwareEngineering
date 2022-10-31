const crypto = require('crypto');
const path = require('path');
const { buffer } = require('stream/consumers');
const axios = require('axios');
const qs = require('qs');
require("dotenv").config({ path: path.resolve(__dirname, './config/.env') }); // Load env variables;

const serializeParams = (params) => {
    var sortedKeys = Object.keys(params).sort();
    var serializedParams = '';
    var delimiter = '';
    sortedKeys.forEach((k) => {
        serializedParams += delimiter;
        serializedParams += encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
        delimiter = '&';
    });
    return serializedParams
        .replace('!', '%21')
        .replace("'", '%27')
        .replace('(', '%28')
        .replace(')', '%29')
        .replace('*', '%2A');
};

/**
 * Generates a header to make a request to the Duo API. Details about
 * the header can be found here: https://duo.com/docs/authapi#authentication
 * @param method HTTP method (uppercase) the request will use (i.e. post, get, etc.)
 * @param path API method's path
 * @param params JSON obj of the URL-encoded parameters (in lexigraphical order)
 */
const generateDuoHeader = (method, path, params) => {

    // Date
    let date = new Date(Date.now());
    // date.setHours(date.getHours()-4)
    let timeZoneNumber = date.toString().substring(28, 33);
    let dateStr = date.toUTCString().substring(0, 26) + timeZoneNumber;
    var serializedParams = (params ? serializeParams(params) : '');
    var canon = [
        dateStr,
        method,
        process.env.DUO_API_HOSTNAME,
        path,
        serializedParams
    ].join('\n');
    console.log(canon);
    var sig = crypto
        .createHmac('sha1', process.env.DUO_SECRET_KEY)
        .update(canon)
        .digest('hex');
    var auth = process.env.DUO_INTEGRATION_KEY + ':' + sig;
    return {
        'Date': dateStr,
        'Authorization': 'Basic ' + Buffer.from(auth).toString('base64'),
        'Host': process.env.DUO_API_HOSTNAME,
        // 'Content-Length': 0,
        'Content-Type': 'application/x-www-form-urlencoded'
    };
}

const getLogo = () => {
    const method = 'GET';
    const path = '/auth/v2/check'

    const headers = generateDuoHeader(method, path, {});
    console.log(headers);
    const instance = axios.create({
        baseURL: `https://${process.env.DUO_API_HOSTNAME}`,
        headers: headers
    });

    const body = {};
    
    instance.get(path, qs.stringify(body)).then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        // console.log(error.request);
        if (error) console.error(error.response.data);
    });

    // axios.post()

}

getLogo();