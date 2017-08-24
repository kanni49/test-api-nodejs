'use strict'
const client = require('./../../config/db');
const default_fields = ["id","lang","content_type","count_views","detail","create_date","publish_date"];

exports.getContentDetail = function(lang, id){

  return new Promise(function(resolve, reject){
    const query = "SELECT * FROM contents WHERE lang = ? AND id = ?";
    client.execute(query,[lang, id],{prepare:true}, function(err, result){
      if (err) {
        reject(err);
      } else {
        console.log(result);
        resolve(result.rows);
      }
    });

  });

}

exports.get_id = async function() {
  const query = "SELECT id FROM content_by_contenttype_status WHERE content_type = ? AND status = ? LIMIT 10";
  var idArr = [];
  var temp = await client.execute(query, ['all', 'publish'] , {prepare: true});
  for (var i = 0; i < temp.rows.length; i++) {
    idArr.push(temp.rows[i].id);
  }
  return idArr;
}

exports.get_data = async function(idArr){
  var resultArr = [];
  var itemOrder = [];
  const query = "SELECT "+default_fields+" FROM contents WHERE lang = ? AND id IN ?";
  var temp = await client.execute(query, ['th', idArr], {prepare: true});
  var itemOrder2 = temp.rows.filter(function(obj){
      if(idArr.indexOf(obj.id) === -1) {
        return false;
      }
      return true;
  });
  return itemOrder2;

}
