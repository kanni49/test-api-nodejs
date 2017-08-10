const request = require('request');

const client = require('./../../config/db');

exports.getContent = async function(lang, id, response) {
  const query = "SELECT * FROM contents WHERE lang = ? AND id = ?";
  var result = await client.execute(query, [lang, id], {prepare: true});
  response(null, result);
}

exports.addContent = async function(req, response) {
  const query = "INSERT INTO contents2 JSON'" + JSON.stringify(req).replace(
    /'/g, "''") + "' ";

  var result = await client.execute(query, {prepare: true});
  response(null, result);
}
