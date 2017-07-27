const express = require('express');
const app = express();

module.exports = function(app) {
  app.use('/v1/select', require('./controllers/demo'));
  app.use('/v1/add', require('./controllers/demo_insert'));
  app.use('/v1/update', require('./controllers/demo_update'));
  app.use('/v1/del', require('./controllers/demo_delete'));
};
