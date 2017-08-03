var express = require('express');
var router = express.Router();
var request = require('request');
var path = require('path');
var WebSocket = require('ws')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.header("Content-Type", "text/html; charset=iso-8859-1");
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

var token = '';
request.get('https://stream.watsonplatform.net/authorization/api/v1/token?url=https://stream.watsonplatform.net/speech-to-text/api', {
  'auth': {
    'user': '08f3a6da-75df-4e84-88b5-8c6322b1054c',
    'pass': 'YnTw5Bx826vm'
  }
},(error, response, body) => {
  console.log(body);
  token = body;

  var wsURI = 'wss://stream.watsonplatform.net/speech-to-text/api/v1/recognize?watson-token=' +
  token + '&model=es-ES_BroadbandModel';
  var websocket = new WebSocket(wsURI);
  websocket.onopen = function(evt) { onOpen(evt) };
  websocket.onclose = function(evt) { onClose(evt) };
  websocket.onmessage = function(evt) { onMessage(evt) };
  websocket.onerror = function(evt) { onError(evt) };

  function onOpen(evt) {
    var message = {
      'action': 'start',
      'content-type': 'audio/l16;rate=22050'
    };
    websocket.send(JSON.stringify(message));
  }

  function onMessage(evt) {
    console.log(evt.data);
  }

});



module.exports = router;
