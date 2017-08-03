var express = require('express');
var request = require('request');
var router = express.Router();

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

        var signature = req.headers['X-Line-Signature'];

        console.log(sugnature);
        
        res.send('OK');

    });

    return router;

};
;

module["exports"] = WebHookController;
