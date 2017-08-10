'use strict';

const request = require('request');
const client = require('./../../config/db');

const query = "SELECT * FROM contents WHERE lang = ? AND id = ?";
var default_fields = ["id","lang","content_type","count_views","detail"];

var lang, id;

exports.getContent = async function(fields,response) {
  if(fields){
    const query_col = "SELECT * FROM contents2 WHERE lang = ? AND id = ?";
    var temp_col = await client.execute(query_col, [lang='th', id='R5g9VDjq9rQ'], {prepare: true});

    var all_fields = [];
    for (var i = 0; i < temp_col.columns.length; i++) {
      all_fields.push(temp_col.columns[i].name);
    }

    var custom_fields = [];
    custom_fields = fields.split(",");

    var new_fields = [];
    for (var i = 0; i < all_fields.length; i++) {
      for (var j = 0; j < custom_fields.length; j++) {
        if(all_fields[i]==custom_fields[j])
          new_fields.push(custom_fields[j]);
      }
    }

    var query_fields = default_fields.concat(new_fields);
    const query2 = "SELECT "+query_fields+" FROM contents2 WHERE lang = ? AND id = ?";
    var temp2 = await client.execute(query2, [lang, id], { prepare : true });

    response(null, temp2.first());

  }else{
    const query3 = "SELECT "+default_fields+" FROM contents WHERE lang = ? AND id = ?";
		var temp3 = await client.execute(query3, [lang, id], { prepare : true });
    response(null, temp3.first());
  }
}

exports.getContentDetails = async function(fields,response) {
  const query = "SELECT "+default_fields+" FROM contents WHERE lang = ? AND id = ?";
  var result = await client.execute(query, [lang='th', id='GvpOmEe13K7'], {prepare: true});
  response(null, result.rows);

}

exports.getContentById = async function(lang, id, response) {
  const query = "SELECT "+default_fields+" FROM contents WHERE lang = ? AND id = ?";
  var result = await client.execute(query, [lang, id], {prepare: true});
  response(null, result.first());
}

exports.getContentById2 = async function(lang, id, response) {
  console.log('test');
  const query1 = "SELECT "+default_fields+" FROM contents2 WHERE lang = ? AND id = ?";
  var result = await client.execute(query1, [lang, id], {prepare: true});
  response(null, result.first());
}

exports.getContentFields = async function(lang, id, fields, response) {
  if(fields){
    const query_col = "SELECT * FROM contents2 WHERE lang = ? AND id = ?";
    var temp_col = await client.execute(query_col, [lang='th', id='R5g9VDjq9rQ'], {prepare: true});

    var all_fields = [];
    for (var i = 0; i < temp_col.columns.length; i++) {
      all_fields.push(temp_col.columns[i].name);
    }

    var custom_fields = [];
    custom_fields = fields.split(",");

    var new_fields = [];
    for (var i = 0; i < all_fields.length; i++) {
      for (var j = 0; j < custom_fields.length; j++) {
        if(all_fields[i]==custom_fields[j])
          new_fields.push(custom_fields[j]);
      }
    }

    var query_fields = default_fields.concat(new_fields);
    const query2 = "SELECT "+query_fields+" FROM contents2 WHERE lang = ? AND id = ?";
    var temp2 = await client.execute(query2, [lang, id], { prepare : true });

    response(null, temp2.first());

  }else{
    const query3 = "SELECT "+default_fields+" FROM contents WHERE lang = ? AND id = ?";
		var temp3 = await client.execute(query3, [lang, id], { prepare : true });
    response(null, temp3.first());
  }
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
