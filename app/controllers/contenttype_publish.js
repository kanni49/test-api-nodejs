'use strict';

const express = require('express');
const router = express.Router();

const content = require('./../models/contenttype_publish');

var default_fields = ["id","lang","content_type","count_views","detail","create_date","publish_date"];

// console.log(content.def);
router.get('/', function(req, res){
  content.getContentType(req.query.fields,function(err, result){
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

router.get('/1', function(req, res){
  content.getData(function(err, result){
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
