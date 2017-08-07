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

        if(data.messages.length && data.messages.length > 0 && data.messages[0].chatId && data.messages[0].from){

            self.replyToMessage(data.messages[0].from,data.messages[0].chatId);

        }

        res.send("OK");

    });

    return router;

};

WebHookController.prototype.replyToMessage = function(to,chatId){

    var request_options = {
        url: "https://api.kik.com/v1/message",
        auth: {
            user: init.kilUserName,
            pass: init.kikAPIKey
        },
        json: {
            "messages": [
                {
                    "body": "ともだちんこ", 
                    "to": to, 
                    "type": "text", 
                    "chatId": chatId
                }
            ]
        }
    };

    // POST request to create webhook config
    request.post(request_options, function (error, response, body) {

        if(error)
            console.log(error);

        console.log(body)

    })

};


module["exports"] = WebHookController;
