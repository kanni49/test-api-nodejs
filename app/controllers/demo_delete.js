const express = require('express');
const router = express.Router();

const demo_delete = require('./../models/demo_delete');
const demo_delete2 = require('./../models/demo_delete_asyncawait');

router.delete('/deleteData', async function(req, res) {
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

  var result;
  try {
    result = await demo_delete2.delContent(req.query.lang, req.query.id);
    return res.status(200).send({
      code: 200,
      message: result
    });

  } catch (e) {
    return res.status(400).send({
      code: 400,
      message: e
    });
  }

});

module.exports = router;
