const express = require('express');
const router = express.Router();

const demo_update = require('./../models/demo_update');
const demo_update2 = require('./../models/demo_update_asyncawait');

const data = require('../../data.json');

router.post('/updateData', function(req, res) {

    var test_json = {
      "lang": "th",
      "id": "1",
      "detail": "detail test updateData"
    };

    demo_update2.update(test_json, function(err, result) {
      if (err) console.log(err);
      return res.send({
        "code": "200",
        id: test_json.id,
        message: 'ID ' + test_json.id +
          ' has been successfully updated.'
      });
    });

});

router.post('/updateJsonData', function(req, res) {

    demo_update2.update(data, function(err, result) {
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
