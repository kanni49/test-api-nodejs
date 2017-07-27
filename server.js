var express = require('express');
var app = express();
var port = 7777;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

require('./app/routes')(app);

app.listen(port, function() {
  console.log('Listening on port:' + port);
});
