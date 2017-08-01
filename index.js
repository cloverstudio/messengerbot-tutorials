var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();

const app = express();
app.use(bodyParser.json());

const FacebookWebHookController = require('./facebook/webhook');

router.use("/facebook", new FacebookWebHookController().init());

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use('', router);

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})