const request = require('request');

const client = require('./../../config/db');

// exports.delContent = function(lang, id) {
//   const query = "DELETE FROM contents2 WHERE lang = ? AND id = ?";
//   return new Promise(function (resolve, reject) {
//     client.execute(query, [lang, id], {prepare: true}, function(err, result){
//       if(err){
//         reject(err);
//       }else{
//         resolve(result);
//       }
//     });
//   });
// }

exports.delContent = async function(lang, id){
  const query = "DELETE FROM contents2 WHERE lang = ? AND id = ?";
  try {
    var result = await client.execute(query, [lang, id], {prepare: true});
    return result;
  } catch (e) {
    console.log(e);
  }

}
