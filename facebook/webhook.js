var express = require('express');
var request = require('request');
var router = express.Router();

var init = require('../init.js');

var WebHookController = function(){
}

WebHookController.prototype.init = function(app){

    var self = this;

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
                            self.receivedMessage(event);
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

};

WebHookController.prototype.receivedMessage = function(event){

    var self = this;

    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
    console.log(JSON.stringify(message));

    var messageId = message.mid;

    var messageText = message.text;
    var messageAttachments = message.attachments;

    if (messageText) {

    // If we receive a text message, check to see if it matches a keyword
    // and send back the example. Otherwise, just echo the text we received.
    switch (messageText) {
        case 'generic':
            self.sendTextMessage(senderID);
            break;

        default:
            self.sendTextMessage(senderID);
        }
    } else if (messageAttachments) {
        self.sendTextMessage(senderID);
    }
};

WebHookController.prototype.sendTextMessage = function(recipientId){
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: "chinchin"
        }
    };

    this.callSendAPI(messageData);
};

WebHookController.prototype.callSendAPI = function(messageData) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: init.facebookAccessToken },
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            console.log("Successfully sent generic message with id %s to recipient %s", 
            messageId, recipientId);
        } else {
            console.error("Unable to send message.");
            console.error(response);
            console.error(error);
        }
    });  
}


module["exports"] = WebHookController;
