'use strict';

const express = require('express');
const router = express.Router();

const demo_select = require('./../models/demo_select');
// const demo_insert = require('./../models/demo_insert');
// const demo_update = require('./../models/demo_update');
// const demo_delete = require('./../models/demo_delete');

const data = require('../../data.json');

router.get('/getContent', function(req, res) {
  console.log('0');
  demo_select.getContent(req.query.fields,function(err, result) {
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
  demo_select.getContentDetails(function(err, result) {
    if(err){
      console.log(err);
    }else{
      return res.status(200).send({
        code: 200,
        data: result.first()
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

  demo_select.getContentById(req.query.lang, req.params.id, function(err,
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

  demo_select.getContentById2(req.query.lang, req.query.id, function(err, result) {
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

  demo_select.getContentFields(req.query.lang, req.query.id, req.query.fields, function(err, result) {
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


module.exports = router;
