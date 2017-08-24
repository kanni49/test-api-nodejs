// 'use strict';

const express = require('express');
const router = express.Router();

const asynctest = require('./../models/asyncawaitfunc');

router.get('/', function(req, res){
  asynctest.getContentType(req.query.fields,function(err, result){
    if(err){
      console.log(err);
    }else{
      return res.status(200).send({
        code: 200,
        data: result
      });
    }
  });
});

router.get('/2', function(req, res){
  asynctest.getData2(req.query.fields,function(err, result){
    if(err){
      console.log(err);
    }else{
      return res.status(200).send({
        code: 200,
        data: result
      });
    }
  });
});

module.exports = router;
