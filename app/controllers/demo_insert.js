const express = require('express');
const router = express.Router();

const demo_insert = require('./../models/demo_insert');

const data = require('../../data.json');

router.get('/addContent', function(req, res) {
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

  demo_insert.getContent(req.query.lang, req.query.id, function(err, result) {
    if (err) {
      return res.status(err.code).send({
        code: err.code,
        message: err.message
      });
    } else {
      if (result.rowLength > 0) {
        const json_data = Object.assign({}, result.first(), req.body);

        demo_insert.addContent(json_data, function(err, result) {
          if (err){
            return res.status(400).send({
              code: 400,
              message: 'Data cannot be updated.'
            });
          }else {
            return res.status(200).send({
              code: 200,
              id: json_data.id,
              message: 'ID ' + json_data.id +
                ' has been successfully updated.'
            });
          }

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

router.post('/addData', function(req, res) {

    var test_json = {
      "lang": "th",
      "id": "3",
      "create_date": new Date()
    };

    demo_insert.addContent(test_json, function(err, result) {
      if (err) console.log(err);
      return res.send({
        "code": "200",
        id: test_json.id,
        message: 'ID ' + test_json.id +
          ' has been successfully updated.'
      });
    });

});

router.post('/addJsonData', function(req, res) {

    demo_insert.addContent(data, function(err, result) {
      if (err) console.log(err);
      return res.send({
        "code": "200",
        id: data.id,
        message: 'ID ' + data.id +
          ' has been successfully updated.'
      });
    });

});


module.exports = router;
