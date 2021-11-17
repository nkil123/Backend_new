const express = require ('express'); //function

const app = express ();

app.get ('/', (req, res) => {
  res.send ('Welcome to HomePage');
});
app.get ('/users', (req, res) => {
  let a = require ('../MOCK_DATA.json');
  //   console.log (a);
  res.send (a);
});
app.listen (2348, () => {
  console.log ('listening to 2348');
});
