const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['xxx.xx.xx.xxx'], // IP cassandra client
  keyspace: 'keyspace_name', // keyspace name
  authProvider: new cassandra.auth.PlainTextAuthProvider('username_auth',
    'password_auth') // user and password for authentication
});

client.connect(function(err) {
  if (err) console.log('err:' + err);
  else console.log('connected');
});

module.exports = client;
