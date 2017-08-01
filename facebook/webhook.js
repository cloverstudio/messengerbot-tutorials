var express = require('express');
var router = express.Router();

var WebHookController = function(){
}

WebHookController.prototype.init = function(app){

    router.get('/webhook',(req,res) => {

        res.send('OK')

    });

    return router;

}

module["exports"] = WebHookController;
