const express = require('express');
const request = require('request');
const router = express.Router();

const init = require('../init.js');

var WebHookController = function(){
}

WebHookController.prototype.init = function(app){

    const self = this;

    router.get('/webhook', function(req, res) {
        res.send('OK');
    });

    router.post('/webhook',(req,res) => {

        const self = this;
        const data = req.body;

        console.log("received slack webhook",JSON.stringify(data, null, 3));
        console.log("headers",JSON.stringify(req.headers, null, 3));  
        
        // get challenge
        const reqType = data.type;
        const challenge = data.challenge;

        if(reqType == 'url_verification'){
            res.send(challenge);
            return;
        } else if(reqType == 'event_callback'){

            var eventObj = data.event;
            var eventType = eventObj.type;
            var eventSubType = eventObj.subtype;

            if(eventObj.type == "message" && eventSubType === undefined){

                self.replyToMessage(eventObj);

            }

        }

        res.send("OK");

    });

    return router;

};

WebHookController.prototype.replyToMessage = function(messageObj){

    var message = {
        text: 'ちんちん'
    }

    request({
        uri: init.slackIncomingWebHookURL,
        method: 'POST',
        json: message

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            console.log('message sent',body);

        } else {
            console.error("Unable to send message.");
            console.error(response);
            console.error(error);
        }
    });  

};


module["exports"] = WebHookController;
