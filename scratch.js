/**
 * Generates a header to make a request to the Duo API. Details about
 * the header can be found here: https://duo.com/docs/authapi#authentication
 * @param method HTTP method (uppercase) the request will use (i.e. post, get, etc.)
 * @param host API hostname (lowercase) the request will use
 * @param path API method's path
 * @param params JSON obj of the URL-encoded parameters (in lexigraphical order)
 */
const generateDuoEncodedHeader = (method, host, path, params) => {
    host = 'https://api-efbbe6f2.duosecurity.com'; // TODO: Remove in prod
    
    let headers = {};
    
    // Date
    let timeZoneNumber = (new Date()).toString().substring(28, 33);
    let dateStr = (new Date('2000/07/18')).toUTCString().substring(0, 26) + timeZoneNumber;


    let lfLineFeed = '\n';

    // Build Header
    let headerStr = dateStr + lfLineFeed; // Add date and lf
    headerStr += method + lfLineFeed; // Add HTTP method and lf
    headerStr += host + lfLineFeed; // Add host and lf
    headerStr += path + lfLineFeed; // Add path and lf

    let paramsList = '';
    for (const [key, value] of Object.entries(params)) {
        paramsList += `${key}=${value}&`
    }
    paramsList = paramsList.substring(0, paramsList.length);
    headerStr += encodeURIComponent(paramsList) + lfLineFeed; // Add params list and lf

    headers.Authorization = headerStr;
    headers.Date = dateStr;
    return headers;
}

console.log(JSON.stringify(generateDuoEncodedHeader('POST', '', '/auth/v2/logo', {
})));