var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();

const app = express();

var rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}


app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: function () { return true } }));
app.use(function(req, res, next) {
  var data = '';
  req.on('data', function(chunk) { 
    data += chunk;
  });
  req.on('end', function() {
    req.rawBody = data;
  });
  next();
});

const FacebookWebHookController = require('./facebook/webhook');
const LineWebHookController = require('./line/webhook');
const SlackWebHookController = require('./slack/webhook');
const WechatWebHookController = require('./wechat/webhook');
const TwitterWebHookController = require('./twitter/webhook');
const SkypeController = require('./skype/endpoint');

router.use("/facebook", new FacebookWebHookController().init());
router.use("/line", new LineWebHookController().init());
router.use("/slack", new SlackWebHookController().init());
router.use("/wechat", new WechatWebHookController().init());
router.use("/twitter", new TwitterWebHookController().init());

app.use('', router);

app.post('/skype',new SkypeController().init());

app.get('/', function (req, res) {
  res.send('Hello World!')
})



app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})