// console app to setup webhook url
// use $ node ./telegram/console/getWebhookInfo.js [token] 

const request = require('request');
const init = require('../../init.js');

// request options
var request_options = {
    url: "https://api.kik.com/v1/config",
    auth: {
        user: init.kilUserName,
        pass: init.kikAPIKey
    },
}

// POST request to create webhook config
request.get(request_options, function (error, response, body) {
  console.log(body)
})