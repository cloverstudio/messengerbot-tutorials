var express = require('express');
var router = express.Router();

var init = require('../init.js');

var WebHookController = function(){
}

WebHookController.prototype.init = function(app){

    router.get('/webhook',(req,res) => {

        if (req.query['hub.mode'] === 'subscribe' &&
            req.query['hub.verify_token'] === init.facebookVerifyToken) {
            console.log("Validating webhook");
            res.status(200).send(req.query['hub.challenge']);
        } else {
            console.error("Failed validation. Make sure the validation tokens match.");
            res.sendStatus(403);          
        }  

    });

    return router;

}

module["exports"] = WebHookController;
