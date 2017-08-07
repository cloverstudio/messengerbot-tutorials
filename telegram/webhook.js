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

        if(data.message && data.message.chat && data.message.chat.id){

            self.replyToMessage(data.message.chat.id);

        }

        res.send("OK");

    });

    return router;

};

WebHookController.prototype.replyToMessage = function(chatId){

    const url = 'https://api.telegram.org/bot' + init.telegramBotToken + '/sendMessage';
    const request_options = {
        url: "",
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        formData: {
            chat_id: chatId,
            text: "ともだちんこ"
        }
    }

    // POST request to create webhook config
    request.post(request_options, function (error, response, body) {

        if(error)
            console.log(error);
        
        console.log(body)
    })

};


module["exports"] = WebHookController;
