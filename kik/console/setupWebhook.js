// console app to setup webhook url
// use $ node ./kik/console/setupWebhook.js [url] 
// configure init.js before doing this

const request = require('request');
const init = require('../../init.js');

var args = process.argv.slice(2);

var webHookURL = args[0];

if(!webHookURL){
    console.log('Please specify webhook url');
    return;
}

// request options
var request_options = {
    url: "https://api.kik.com/v1/config",
    auth: {
        user: init.kilUserName,
        pass: init.kikAPIKey
    },
    json: {
        "webhook": webHookURL, 
        "features": {
            "receiveReadReceipts": false, 
            "receiveIsTyping": false, 
            "manuallySendReadReceipts": false, 
            "receiveDeliveryReceipts": false
        }
    }
};

// POST request to create webhook config
request.post(request_options, function (error, response, body) {
  console.log(body)
})