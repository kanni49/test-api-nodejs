'use strict';

const express = require('express');
const router = express.Router();

const demo_select = require('./../models/demo_select');
const demo_select2 = require('./../models/demo_select_asyncawait');
const data = require('../../data.json');


router.get('/getContent', function(req, res) {

  demo_select2.getContent(req.query.fields,function(err, result) {
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

router.get('/getContentDetails', function(req, res) {
  console.log('1');
  demo_select2.getContentDetails(req.query.fields,function(err, result) {
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

router.get('/getIdParams/:id', function(req, res) {
  console.log('2');
  if(!req.query.lang){
    req.query.lang = 'th';
  }
  req.query.lang = req.query.lang.toLowerCase();

  demo_select2.getContentById(req.query.lang, req.params.id, function(err,
    result) {
    if (err) console.log('err' + err);
    else {
      return res.status(200).send({
        code: 200,
        data: result
      });
    }
  });
});

router.get('/getContentById2', function(req, res) {
  console.log('3');
  if (!req.query.lang) {
    req.query.lang = 'th';
  }
  req.query.lang = req.query.lang.toLowerCase();

  if (!req.query.id) {
    return res.status(400).send({
      code: 400,
      message: 'There have been validation errors: id'
    });
  }

  demo_select2.getContentById2(req.query.lang, req.query.id, function(err, result) {
    if (err) {
      return res.status(404).send({
        code: 404,
        message: 'Data not found.'
      });
    } else {
      if (result) {
        // console.log(result);
        return res.status(200).send({
          code: 200,
          data: result
        });
      } else {
        return res.status(404).send({
          code: 404,
          message: 'Data not found.'
        });
      }
    }
  });
});

router.get('/getContentFields', function(req, res, next) {
  console.log('4');
  if (!req.query.lang) {
    req.query.lang = 'th';
  }
  req.query.lang = req.query.lang.toLowerCase();

  if (!req.query.id) {
    return res.status(400).send({
      code: 400,
      message: 'There have been validation errors: id'
    });
  }

  demo_select2.getContentFields(req.query.lang, req.query.id, req.query.fields, function(err, result) {
    if (err) {
      return res.status(404).send({
        code: 404,
        message: 'Data not found.'
      });
    } else {
      if (result) {
        return res.status(200).send({
          code: 200,
          data: result
        });
      } else {
        return res.status(404).send({
          code: 404,
          message: 'Data not found.'
        });
      }
    }
  });
});


module.exports = router;
