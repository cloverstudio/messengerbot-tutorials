const express = require('express');
const request = require('request');
const router = express.Router();
const crypto = require('crypto');
const line = require('@line/bot-sdk');

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

        console.log("received line webhook",JSON.stringify(data, null, 3));
        console.log("headers",JSON.stringify(req.headers, null, 3));  
        
        // get challenge
        const reqType = data.type;
        const challenge = data.challenge;

        if(reqType == 'url_verification'){
            res.send(challenge);
            return;
        }

        res.send("OK");

    });

    return router;

};

WebHookController.prototype.replyToMessage = function(replyToken){

    const client = new line.Client({
        channelAccessToken: init.lineChannelAccessToken
    });

    const message = {
        type: 'text',
        text: 'ちんちん'
    };

    client.replyMessage(replyToken, message)

        .then(() => {
            console.log('success to send message');
        })
        .catch((err) => {
            console.log('failed to reply message',err)
        });
            
    };


module["exports"] = WebHookController;
