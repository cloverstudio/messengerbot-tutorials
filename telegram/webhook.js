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

        res.send("OK");

    });

    return router;

};

WebHookController.prototype.replyToMessage = function(messageObj){

};


module["exports"] = WebHookController;
