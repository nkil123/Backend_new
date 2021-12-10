const redis = require ('redis');
const client = redis.createClient ();

client.on ('connect', async function () {
  console.log ('connected to redis');
});

module.exports = client;
