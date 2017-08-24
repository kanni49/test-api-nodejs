const express = require('express');
const router = express.Router();

const contents = require('./../models/demo_insert_asyncawait');

const data = require('../../data.json');

router.get('/addContent', async function(req, res) {
  var result_contents = [];

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

  try {
    result_contents = await contents.getContent(req.query.lang, req.query.id);

  } catch (err) {
    return res.status(400).send({
      code: 400,
      message: 'Can not get contents from contents tbl.'
    });
  }

  try {
    const json_data = Object.assign({}, result_contents, req.body);
    console.log(json_data[0]);

    var result = await contents.addContent(json_data[0]);
    return res.status(200).send({
      code: 200,
      message: 'Add contents has been successfully.'
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      code: 400,
      message: 'Can not add contents to contents3.'
    });
  }

});

module.exports = router;
