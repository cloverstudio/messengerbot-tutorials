var express = require('express');
var router = express.Router();

var init = require('../init.js');

var WebHookController = function(){
}

WebHookController.prototype.init = function(app){

    router.get('/webhook', function(req, res) {
        if (req.query['hub.mode'] === 'subscribe' &&
            req.query['hub.verify_token'] === init.facebookVerifyToken) {
            console.log("Validating webhook");
            res.status(200).send(req.query['hub.challenge']);
        } else {
            console.error("Failed validation. Make sure the validation tokens match.");
            res.sendStatus(403);          
        }  
    });

    router.post('/webhook',(req,res) => {

        var data = req.body;

        console.log("receive post",JSON.stringify(data, null, 3));

        // Make sure this is a page subscription
        if (data.object === 'page') {

            // Iterate over each entry - there may be multiple if batched
            data.entry.forEach(function(entry) {
                var pageID = entry.id;
                var timeOfEvent = entry.time;

                if(entry.messaging){

                    // Iterate over each messaging event
                    entry.messaging.forEach(function(event) {

                        if (event.message) {
                            receivedMessage(event);
                        } else {
                            console.log("Webhook received unknown event: ", event);
                        }

                    });

                }
            
            });

        }

        // Assume all went well.
        //
        // You must send back a 200, within 20 seconds, to let us know
        // you've successfully received the callback. Otherwise, the request
        // will time out and we will keep trying to resend.
        res.sendStatus(200);

    });

    return router;

}

module["exports"] = WebHookController;
