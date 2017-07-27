const request = require('request');

const client = require('./../../config/db');

exports.delContent = function(lang, id, response) {
    const query = "DELETE FROM contents2 WHERE lang = ? AND id = ?";
    client.execute(query, [lang, id], {prepare: true}, function(err, result) {
        if (err) return response(err);

        response(null, result);
    });
}
