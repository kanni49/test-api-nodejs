var express = require('express');
var app = express();
var port = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use(function(req, res, next) {
//
//     var header=req.headers['authorization']||'',     // get the header
//      token=header.split(/\s+/).pop()||'',            // and the encoded auth token
//      auth=new Buffer(token, 'base64').toString(),    // convert from base64
//      parts=auth.split(/:/),                          // split on colon
//      username=parts[0],
//      password=parts[1];
//
//     console.log(auth);
//     if (header === '' || username !== 'user' || password !== 'pass') {
//         return res.status(401).send({
//           code: 401,
//           status: 'Error',
//           message: 'Unauthorized'
//         });
//     } else {
//         next();
//     }
// });

require('./app/routes')(app);

app.listen(port, function() {
  console.log('Listening on port:' + port);
});
