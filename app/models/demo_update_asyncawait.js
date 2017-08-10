const request = require('request');

const client = require('./../../config/db');

exports.update = async function(req, response) {
  const query = "INSERT INTO contents2 JSON'" + JSON.stringify(req).replace(
    /'/g, "''") + "' ";

  var result = await client.execute(query, {prepare: true});
  response(null, result);
}
