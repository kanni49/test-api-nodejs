'use strict';

const client = require('./../../config/db');

var id, lang, content_type, create_date, status;
var idArr, data = [];
var default_fields = ["id","lang","content_type","count_views","detail","create_date","publish_date"];

exports.getContentType = async function(fields, response){

    idArr = await get_id();
    console.log(idArr);

    data = await get_data(idArr);
    console.log(data);
    response(null,data);
}

var get_id = async function() {
  const query = "SELECT id FROM content_by_contenttype_status WHERE content_type = ? AND status = ? LIMIT 10";
  var idArr = [];
  var temp = await client.execute(query, ['all', 'publish'] , {prepare: true});
  for (var i = 0; i < temp.rows.length; i++) {
    idArr.push(temp.rows[i].id);
  }
  return idArr;
}

var get_data = async function(idArr){
  var resultArr = [];
  var itemOrder = [];
  const query1 = "SELECT "+default_fields+" FROM contents WHERE lang = ? AND id IN ?";
  var temp = await client.execute(query1, ['th', idArr], {prepare: true});
  var itemOrder2 = temp.rows.filter(function(obj){
      if(idArr.indexOf(obj.id) === -1) {
        return false;
      }
      return true;
  });
  return itemOrder2;

}


exports.getData2 = async function(fields, callback){
  var data = [];
  data = await content2();
  callback(null, data);
}

var content2 = async function () {
    const query = 'SELECT * FROM contents2';
    var data = [];
    var temp = await client.execute(query, [], { prepare: true });
    for (var i = 0; i < temp.rows.length; i++) {
      data.push(temp.rows[i]);
    }
    return data;
}
// var content2 = function(){
//   const query = 'SELECT * FROM contents2';
//   var data = [];
//   return new Promise(function(resolve, reject){
//     client.execute(query, [], { prepare: true })
//     .then(result => {
//       for (var i = 0; i < result.rows.length; i++) {
//         data.push(result.rows[i]);
//       }
//       resolve(data);
//     });
//   });
// }

// var get_id = function() {
//   const query = "SELECT id FROM content_by_contenttype_status WHERE content_type = ? AND status = ? LIMIT 10";
//   return new Promise(function (resolve, reject) {
//     client.execute(query, ['all', 'publish'] , {prepare: true}, function(err, result1) {
//       if(err) resolve(err);
//
//       var idArr = [];
//       for (var i = 0; i < result1.rows.length; i++) {
//         idArr.push(result1.rows[i].id);
//       }
//       resolve(idArr);
//     });
//   });
// }

// var get_data = function(idArr){
//   var resultArr = [];
//   var itemOrder = [];
//   const query1 = "SELECT "+default_fields+" FROM contents WHERE lang = ? AND id IN ?";
//   return new Promise(function (resolve, reject) {
//     client.execute(query1, ['th', idArr], {prepare: true}, function(err, result) {
//       if(err) resolve(err);
//
//       var itemOrder2 = result.rows.filter(function(obj){
//         if(idArr.indexOf(obj.id) === -1) {
//           return false;
//         }
//         return true;
//       });
//
//       resolve(itemOrder2);
//
//     });
//   });
// }
