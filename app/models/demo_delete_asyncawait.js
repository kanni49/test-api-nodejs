const request = require('request');

const client = require('./../../config/db');

exports.delContent = function(lang, id) {
  const query = "DELETE FROM contents2 WHERE lang = ? AND id = ?";
  return new Promise(function (resolve, reject) {
    client.execute(query, [lang, id], {prepare: true}, function(err, result){
      if(err){
        // return Promise.reject(new Error(400));
        reject('delete fail');
      }else{
        resolve('delete success');
      }
    });
  });
}

// exports.delContent = async function(lang, id){
//   const query = "DELETE FROM contents2 WHERE lang = ? AND id = ?";
//   try {
//     var result = await client.execute(query, [lang, id], {prepare: true});
//     return result;
//   } catch (e) {
//     throw new Error(400);
//   }
// }
//
// exports.delContent = async function(lang, id){
//   const query = "DELETE FROM contents2 WHERE lang = ? AND id = ?";
//   var result = await client.execute(query,[lang,id], {perp})
//
//
// }
