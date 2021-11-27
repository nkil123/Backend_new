const app = require ('./app');

const connect = require ('./configs/db');

app.listen (2344, async (req, res) => {
  await connect ();
  console.log ('listening to 2344');
});
