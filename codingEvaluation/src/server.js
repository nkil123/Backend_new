const app = require ('./app');

const connect = require ('./configs/dbs');

app.listen (2345, async (req, res) => {
  await connect ();
  console.log ('listening to port 2345');
});
