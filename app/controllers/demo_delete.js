const express = require('express');
const router = express.Router();

const demo_delete = require('./../models/demo_delete');
const demo_delete2 = require('./../models/demo_delete_asyncawait');

router.delete('/deleteData', function(req, res) {
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

  demo_delete2.delContent(req.query.lang, req.query.id, function(err, result) {
    if (err) {
      return res.status(err.code).send({
        code: err.code,
        message: err.message
      });
    } else {
      return res.status(200).send({
        code: 200,
        message: 'ID:'+req.query.id+' has been successfully deleted.'
      });
    }
  });
});





module.exports = router;
