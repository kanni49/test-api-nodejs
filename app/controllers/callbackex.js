'use strict';

const express = require('express');
const router = express.Router();

router.get('/ex', async function(req, res){
  // console.log(res);
  // callbackEx(req.query.id, function(err, result){
  //   if(err){
  //     console.log(err);
  //   }else{
  //     // console.log(result);
  //     if(result.length > 1){
  //       return res.send(result);
  //     }
  //     // return res.status(200).send({
  //     //   code: 200,
  //     //   data: result
  //     // });
  //   }
  // });

  console.log(await asyncAwait(req.query.id));

});

var myCallback = function(err, data) {
  if(err) throw err;
  console.log('got data: '+data);
};

var callbackEx = function(id, callback) {
  if(id){
    var idArr = [];
    var idData = [];
    idArr = id.split(",");

    for(var i=0;i<idArr.length;i++){
      idData.push(idArr[i]);
    //  console.log('Product no ' + i);
    }
    // console.log('Id: ' + idData);
    callback(idData);
  }else{
    callback('no id');
  }
};

function asyncAwait(id){
  return new Promise(function(res,rej){
    if(id){
      let idArr = [];
      let idData = [];
      idArr = id.split(",");
      for (var i = 0; i < idArr.length; i++) {
        idData.push(idArr[i]);
      }
      res(idData)
    }else {
      res('no id input')
    }
  })
}

function test4(text) {
  return new Promise(function(res, rej){
    setTimeout(function(){
      res(text);
    },2000);
  })
}


module.exports = router;
