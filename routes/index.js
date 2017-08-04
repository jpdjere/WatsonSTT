var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.header("Content-Type", "text/html; charset=iso-8859-1");
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});
/* GET tokenSTT. */
router.get('/token', function(req, res, next) {
  getTokenSTT().then((token) => {
    res.send(token);
  })
});

var token = '';
let getTokenSTT = () => {
  return new Promise(
    (resolve, reject) => {
      request.get('https://stream.watsonplatform.net/authorization/api/v1/token?url=https://stream.watsonplatform.net/speech-to-text/api', {
        'auth': {
          'user': '08f3a6da-75df-4e84-88b5-8c6322b1054c',
          'pass': 'YnTw5Bx826vm'
        }
      },(error, response, body) => {
        console.log(body);
        token = body;
        resolve(token);
      });
    }
  )
}






module.exports = router;
