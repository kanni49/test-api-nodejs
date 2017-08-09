// 'use strict';

const request = require('request');
const client = require('./../../config/db');

const query = "SELECT * FROM contents WHERE lang = ? AND id = ?";
var default_fields = ["id","lang","content_type","count_views","detail"];

var lang, id;

exports.getContent = function(fields, response) {
  const query = "SELECT "+default_fields+" FROM contents WHERE lang = ? AND id = ?";
  client.execute(query, [lang='th', id='R5g9VDjq9rQ'], {prepare: true}, function(err, result) {
    if (err){
      return response(err);

    }else{
      if(fields){

        var all_fields = [];

        for (var i = 0; i < result.columns.length; i++) {
          all_fields.push(result.columns[i].name);
        }
        // console.log(all_fields);

        var custom_fields = [];
        custom_fields = fields.split(",");

        console.log(custom_fields);


        var new_fields = [];
        for (var i = 0; i < all_fields.length; i++) {
          for (var j = 0; j < custom_fields.length; j++) {
            if(all_fields[i]==custom_fields[j])
            new_fields.push(custom_fields[j]);
          }
        }

        console.log(new_fields);

        var query_fields = default_fields.concat(new_fields);

        const query = "SELECT "+query_fields+" FROM contents2 WHERE lang = ? AND id = ?";

  			client.execute(query, [lang, id], { prepare : true }, function(err, result) {
  				if (err) return response(err);

  				response(null, result.first());
  			});

      }else{
        const query = "SELECT * FROM contents2 WHERE lang = ? AND id = ?";

  			client.execute(query, [lang, id], { prepare : true }, function(err, result) {
  				if (err) return response(err);

  				response(null, result.first());
  			});

        // response(null, result.first());
      }

    }
  });
}

exports.getContentDetails = function(response) {
  const query = "SELECT id,lang,detail FROM contents WHERE lang = ? AND id = ?";
  client.execute(query, [lang='th', id='GvpOmEe13K7'], {
    prepare: true
  }, function(err, result) {
    if (err)
      return response(err);
    else
      response(null, result);
  });
}

exports.getContentById = function(lang, id, response) {
  const query =
    "SELECT id,lang,content_type,count_views,detail FROM contents WHERE lang = ? AND id = ?";

  client.execute(query, [lang, id], {
    prepare: true
  }, function(err, result) {
    if (err) return response(err);

    response(null, result.first());
  });
}

exports.getContentById2 = function(lang, id, response) {
  console.log('test');
  const query1 =
    "SELECT id,lang FROM contents2 WHERE lang = ? AND id = ?";
  client.execute(query1, [lang, id], {prepare: true}, function(err, result) {
    console.log('query');
    if (err)
      return response(err);
    else{
      response(null, result.first());
    }
  });
}

// exports.getContentFields = function(lang, id, fields, response) {
//   // console.log(fields);
//   client.execute("SELECT id,lang,content_type,count_views,detail FROM contents2 WHERE lang = ? AND id = ?", [lang, id], {prepare: true}, function(err, result) {
//     if (err)
//       return response(err);
//     else{
//       if(fields){
//
//         var result_query = [];
//         var default_fields = [];
//
//         for (var i = 0; i < result.columns.length; i++) {
//           default_fields.push(result.columns[i].name);
//         }
//         console.log(default_fields);
//
//         var custom_fields = [];
//         custom_fields = fields.split(",");
//
//         console.log(custom_fields);
//
//         var all_fields = default_fields.concat(custom_fields);
//         console.log(all_fields);
//
//         if(all_fields.indexOf(fields) > -1) {
//           default_fields.push(fields);
//         }
//         console.log(default_fields);
//
//         const query = "SELECT "+all_fields+" FROM contents WHERE lang = ? AND id = ?";
//
//   			client.execute(query, [lang, id], { prepare : true }, function(err, result) {
//   				if (err) return response(err);
//
//   				response(null, result.first());
//   			});
//
//       }else{
//         response(null, result.first());
//       }
//
//     }
//   });
//
// }

exports.getContentFields = function(lang, id, fields, response) {

  client.execute("SELECT * FROM contents2 WHERE lang = ? AND id = ?", [lang, id], {prepare: true}, function(err, result) {
    if (err)
      return response(err);
    else{
      if(fields){

        var all_fields = [];


        for (var i = 0; i < result.columns.length; i++) {
          all_fields.push(result.columns[i].name);
        }
        // console.log(all_fields);

        var custom_fields = [];
        custom_fields = fields.split(",");

        console.log(custom_fields);


        var new_fields = [];
        for (var i = 0; i < all_fields.length; i++) {
          for (var j = 0; j < custom_fields.length; j++) {
            if(all_fields[i]==custom_fields[j])
            new_fields.push(custom_fields[j]);
          }
        }

        console.log(new_fields);

        var query_fields = default_fields.concat(new_fields);

        const query = "SELECT "+query_fields+" FROM contents2 WHERE lang = ? AND id = ?";

  			client.execute(query, [lang, id], { prepare : true }, function(err, result) {
  				if (err) return response(err);

  				response(null, result.first());
  			});

      }else{
        const query = "SELECT "+default_fields+" FROM contents2 WHERE lang = ? AND id = ?";

  			client.execute(query, [lang, id], { prepare : true }, function(err, result) {
  				if (err) return response(err);

  				response(null, result.first());
  			});

        // response(null, result.first());
      }

    }
  });

}

// exports.getContentByContentType = function(lang, id, fields, response) {
//   client.execute("SELECT content_type FROM contents2 WHERE lang = ? AND id = ?", [lang, id], {prepare: true}, function(err, result) {
//     if (err){
//       return response(err);
//
//     }else{
//
//     }
//   });
// }
