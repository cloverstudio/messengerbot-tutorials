var express = require('express');
var request = require('request');
var router = express.Router();
var crypto = require('crypto');

var init = require('../init.js');

var WebHookController = function(){
}

WebHookController.prototype.init = function(app){

    var self = this;

    router.get('/webhook', function(req, res) {
        res.send('OK');
    });

    router.post('/webhook',(req,res) => {

        var data = req.body;

        console.log("received line webhook",JSON.stringify(data, null, 3));
        console.log("headers",JSON.stringify(req.headers, null, 3));

        const signatureOrig = req.headers['x-line-signature'];
        
        // validate signature
        const channelSecret = init.lineChannelSecret;

        const body = req.rawBody; // Request body string
        const signatureGenerated = crypto.createHmac('SHA256', channelSecret).update(body).digest('base64');
        // Compare X-Line-Signature request header and the signature

        console.log(signatureOrig,signatureGenerated);

        res.send('OK');

    });

    return router;

};
;

module["exports"] = WebHookController;
