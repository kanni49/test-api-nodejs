const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['172.24.64.151'],
  keyspace: 'true_cms',
  authProvider: new cassandra.auth.PlainTextAuthProvider('dmp_cms_dev_rw',
    'udBaFL2Vdgv5BW7Ydev')
});

client.connect(function(err) {
  if (err) console.log('err:' + err);
  else console.log('connected');
});

module.exports = client;
