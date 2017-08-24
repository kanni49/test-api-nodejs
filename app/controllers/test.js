'use strict';
const express = require('express');
const router = express.Router();
const test = require('./../models/test');


router.get('/', async function(req, res) {

  try {
    var result = await test.getContentDetail(req.query.lang,req.query.id);
    return res.status(200).send({
      code: 200,
      data: result
    });
  } catch (error) {
    return res.status(400).send({
      code: 400,
      message: error
    });
  }

});

router.get('/getcontent', async function(req, res) {
  var result_id = [];
  try {
    result_id = await test.get_id();

  } catch (err) {
    return res.status(400).send({
      code: 400,
      message: 'Can not get id.'
    });
  }

  try {
    var result = await test.get_data(result_id);
    return res.status(200).send({
      code: 200,
      data: result
    });
  } catch (err) {
    return res.status(400).send({
      code: 400,
      message: 'Can not get data.'
    });
  }

});

module.exports = router;
