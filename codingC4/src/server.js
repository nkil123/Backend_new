const app = require ('./app');

const connect = require ('./configs/dbs');

app.listen (3232, async (req, res) => {
  await connect ();
  console.log ('listening to port 3232');
});
