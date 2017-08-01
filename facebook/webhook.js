var express = require('express');
var router = express.Router();

var WebHookController = function(){
}

WebHookController.prototype.init = function(app){

    router.get('/webhook',(req,res) => {

        res.json({
            value:"148343125", 
            received:"OK"
        });

    });

    return router;

}

module["exports"] = WebHookController;
