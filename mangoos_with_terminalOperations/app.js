const express = require ('express');
const mongoose = require ('mongoose');

const connect = () => {
  return mongoose.connect (
    'mongodb+srv://nileshk17:nileshk17@cluster0.ntjtm.mongodb.net/test'
  );
};

// let books = require ('./users.json');

//Step 2
//schema for our data

const userSchema = new mongoose.Schema (
  {
    id: {type: Number, required: true, unique: true},
    movie_name: {type: String, required: true},
    movie_genre: {type: String, required: false},
    production_year: {type: Number, required: true},
    budget: {type: Number, required: true},
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.model ('movies', userSchema); //users

const app = express ();

app.use (express.json ());

/*
Routers 

post /users
get all /users
get one /users/:id
update one or patch  /users/:id
delete one /users/:id

*/

app.post ('/movies', async (req, res) => {
  try {
    const movie = await User.create (req.body);

    return res.status (201).send (movie);
  } catch (e) {
    res.status (201).send (movie);
  }
});

app.get ('/movies', async (req, res) => {
  //thenable

  try {
    const movies = await User.find ().lean ().exec ();

    return res.status (201).send (movies);
  } catch (e) {
    res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

app.get ('/movies/:id', async (req, res) => {
  //thenable

  try {
    //fetched -> updated - dont fetch
    //fetched --> updated -fetch
    const movie = await User.findById (req.params.id).lean ().exec ();

    return res.status (201).send (movie);
  } catch (e) {
    res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

app.patch ('/movies/:id', async (req, res) => {
  //thenable

  try {
    //fetched -> updated - dont fetch
    //fetched --> updated -fetch
    const movie = await User.findByIdAndUpdate (req.params.id, req.body, {
      new: true,
    })
      .lean ()
      .exec ();

    return res.status (201).send (movie);
  } catch (e) {
    return res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

app.delete ('/movies/:id', async (req, res) => {
  //thenable

  try {
    const movie = await User.findByIdAndDelete (req.params.id).lean ().exec ();

    return res.status (201).send (movie);
  } catch (e) {
    res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

app.listen (2344, async (req, res) => {
  await connect ();
  console.log ('listening to 2344');
});
