var builder = require('botbuilder');

const init = require('../init.js');

var SkypeendpointController = function(){
}

SkypeendpointController.prototype.init = function(app){

    var connector = new builder.ChatConnector({
        appId: init.skypeAppId,
        appPassword: init.skypeAppPassword
    });

    var bot = new builder.UniversalBot(connector);

    //Bot on
    bot.on('contactRelationUpdate', function (message) {

        console.log('contactRelationUpdate',message);

        if (message.action === 'add') {
            var name = message.user ? message.user.name : null;
            var reply = new builder.Message()
                    .address(message.address)
                    .text("Hello %s... Thanks for adding me. Say 'hello' to see some great demos.", name || 'there');
            bot.send(reply);
        } else {
            // delete their data
        }
    });
    bot.on('typing', function (message) {
        // User is typing
        console.log('typing',message);
    });

    bot.on('deleteUserData', function (message) {
        // User asked to delete their data
        console.log('deleteUserData',message);
    });

    bot.on('conversationUpdate', function (message) {
        console.log('conversationUpdate',message);
    });

    //=========================================================
    // Bots Dialogs
    //=========================================================
    String.prototype.contains = function(content){
        return this.indexOf(content) !== -1;
    }

    bot.dialog('/', function (session) {
        if(session.message.text.toLowerCase().contains('hello')){
            session.send(`Hey, How are you?`);
        }else if(session.message.text.toLowerCase().contains('help')){
            session.send(`How can I help you?`);
        }else{
            session.send(`Sorry I don't understand you...`);
        }
    });

    return connector.listen();
    
};


module["exports"] = SkypeendpointController;
