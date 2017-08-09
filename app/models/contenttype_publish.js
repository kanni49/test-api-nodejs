'use strict';

const async = require('async');
const client = require('./../../config/db');

var id, lang, content_type, create_date, status;
var default_fields = ["id","lang","content_type","count_views","detail","create_date","publish_date"];

exports.getContentType = function(fields, response) {
  async.series([
      function(callback) {
          get_id(function(err, res) {
              callback(err, res);
          });
      }
  ],
  function(err, result){
    if(err) response({code:400, message:err});

    var resultArr = [];
    var data = result[0];

    async.series([
        function(callback) {
            get_data(result[0], function(err, res) {
                callback(err, res);
            });
        }
    ],
    function(err, result){
      if(err) response(err);

      response(null,result);
    });
  });
}

exports.getData = function(callback){
  const query = 'SELECT * FROM contents2';

  client.execute(query, [], { prepare: true })
  .then(result => {
    const row = result.first();
    console.log('Data: ', row.id);
  });
}

var get_id = function(callback) {
  const query = "SELECT id FROM content_by_contenttype_status WHERE content_type = ? AND status = ? LIMIT 100";
  client.execute(query, [content_type='all', status='publish'] , {prepare: true}, function(err, result1) {
    if(err) callback(err);

    var idArr = [];
    for (var i = 0; i < result1.rows.length; i++) {
      idArr.push(result1.rows[i].id);
    }
    callback(null,idArr);
  });
}

var get_data = function(idArr, callback) {
  var resultArr = [];
  var itemOrder = [];
  const query1 = "SELECT "+default_fields+" FROM contents WHERE lang = ? AND id IN ?";
    client.execute(query1, ['th', idArr], {prepare: true}, function(err, result) {
      console.log(result.rowLength);
      var itemOrder2 = result.rows.filter(function(obj){
        if(idArr.indexOf(obj.id) === -1) {
          return false;
        }
        return true;
      });

      callback(null, itemOrder2);

    });
}

// module.exports.def = ["id","lang","content_type","count_views","detail","create_date","publish_date"];
