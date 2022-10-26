require("dotenv").config({ path: path.resolve(__dirname, './config/.env') }); // Load env variables;
const Client = require('duo_api')

const getLogo = () => {
    var client = new Client({
        host: process.env.DUO_API_HOSTNAME,
        ikey: process.env.DUO_INTEGRATION_KEY,
        skey: process.env.DUO_SECRET_KEY
    });

    
client.request('get', '/admin/v1/info/summary').then(function(res) {
    console.log(res);
}).catch(function(error) {
    console.error(error);
});
}

getLogo();