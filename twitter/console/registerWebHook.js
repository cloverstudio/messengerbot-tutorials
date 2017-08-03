// console app to register webhook url
// use $ node ./twitter/console/registerWebHook.js http(s)://yoururl

const request = require('request');
const init = require('../../init.js');

var args = process.argv.slice(2);

var webHookURL = args[0];

if(!webHookURL){
    console.log('Please specify webhook url');
    return;
}

var twitter_oauth = {
  consumer_key: init.twitterConsumerKey,
  consumer_secret: init.twitterConsumerSecret,
  token: init.twitterToken,
  token_secret: init.twitterTokenSecret
}

// request options
var request_options = {
  url: 'https://api.twitter.com/1.1/account_activity/webhooks.json',
  oauth: twitter_oauth,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded'
  },
  form: {
    url: webHookURL
  }
}

// POST request to create webhook config
request.post(request_options, function (error, response, body) {
  console.log(body)
})