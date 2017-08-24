const request = require('request');

const client = require('./../../config/db');

exports.getContent = function(lang, id, response) {
  client.execute(
    "SELECT * FROM contents WHERE lang = ? AND id = ?", [
      lang, id
    ], {
      prepare: true
    },
    function(err, results) {
      if (err) {
        console.log(err);
        response('Data not found.');

      } else {
        console.log('result', results);
        response(null, results);
      }
    });
}

exports.addContent = function(req, response) {
  const query = "INSERT INTO contents3 JSON'" + JSON.stringify(req).replace(
    /'/g, "''") + "' ";

  client.execute(query, {prepare: true}, function(err,result) {
    if (err) {
      response(err);
    } else {
      response(null, result);
    }
  });
}
