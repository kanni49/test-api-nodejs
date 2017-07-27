const request = require('request');

const client = require('./../../config/db');

exports.update = function(req, response) {
  const query = "INSERT INTO contents2 JSON'" + JSON.stringify(req).replace(
    /'/g, "''") + "' ";

  client.execute(query, {prepare: true}, function(err,result) {
    if (err) {
      response(err);
    } else {
      response(null, result);
    }
  });
}
