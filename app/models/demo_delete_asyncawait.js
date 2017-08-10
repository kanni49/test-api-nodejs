const request = require('request');

const client = require('./../../config/db');

exports.delContent = async function(lang, id, response) {
    const query = "DELETE FROM contents2 WHERE lang = ? AND id = ?";
    var result = await client.execute(query, [lang, id], {prepare: true});
    response(null, result);

}
