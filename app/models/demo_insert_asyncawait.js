const client = require('./../../config/db');

exports.getContent = async function(lang, id) {
  const query = "SELECT * FROM contents WHERE lang = ? AND id = ?";
  var result = await client.execute(query, [lang, id], {prepare: true});
  return result.rows;
}

exports.addContent = async function(req) {
  const query = "INSERT INTO contents3 JSON'" + JSON.stringify(req).replace(
    /'/g, "''") + "' ";

  var result = await client.execute(query, {prepare: true});
  return result;
}

// exports.getContent = function(lang, id){
//   return new Promise(function(resolve, reject){
//     const query = "SELECT * FROM contents WHERE lang = ? AND id = ?";
//     client.execute(query,[lang, id],{prepare:true}, function(err, result){
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result.rows);
//       }
//     });
//   });
// }
//
// exports.addContent = async function(contents) {
//   return new Promise(function(resolve, reject) {
//     const query = "INSERT INTO contents3 JSON'" + JSON.stringify(req).replace(
//       /'/g, "''") + "' ";
//
//       client.execute(query,[lang, id],{prepare:true}, function(err, result){
//         if (err) {
//           reject(err);
//         } else {
//           resolve(result);
//         }
//       });
//   });
// }
