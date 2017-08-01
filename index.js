var express = require('express');
var router = express.Router();

const app = express()

const FacebookWebHookController = require('./facebook/webhook');

router.use("/facebook", new FacebookWebHookController().init());

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.use('', router);

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})