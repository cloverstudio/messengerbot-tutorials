const express = require('express');
const request = require('request');
const crypto = require('crypto');
const router = express.Router();

const init = require('../init.js');

var WebHookController = function(){
}

WebHookController.prototype.init = function(app){

    const self = this;

    router.get('/webhook', function(req, res) {

        console.log("received twitter get",JSON.stringify(req.query, null, 3));
        console.log("headers",JSON.stringify(req.headers, null, 3));  

        const crcToken = req.query.crc_token;

        if(crcToken){
            // crc check
            var hmac = crypto.createHmac('sha256', init.twitterConsumerSecret).update(crcToken).digest('base64');

            response.send({
                response_token: 'sha256=' + hash
            })

            return;
        }

        res.send("OK");

    });

    router.post('/webhook',(req,res) => {

        const self = this;
        const data = req.body;

        console.log("received twitter webhook",JSON.stringify(data, null, 3));
        console.log("headers",JSON.stringify(req.headers, null, 3));  

        res.send("OK");

    });

    return router;

};

WebHookController.prototype.replyToMessage = function(messageObj){ 

};


module["exports"] = WebHookController;
