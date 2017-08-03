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

        const signatureOrig = req.headers['x-line-signature'];
        
        // validate signature
        const channelSecret = init.lineChannelSecret;

        const body = req.rawBody; // Request body string
        const signatureGenerated = crypto.createHmac('SHA256', channelSecret).update(body).digest('base64');
        // Compare X-Line-Signature request header and the signature

        console.log(signatureOrig,signatureGenerated);

        if(signatureGenerated == signatureOrig){

            if(data.events && data.events.length > 0
                && data.events[0].replyToken)
                // valid line request
                this.replyToMessage(data.events[0].replyToken);
            else
                res.send('OK');
        } else {
            res.send('OK');
        }

        

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
