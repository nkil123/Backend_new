const express = require ('express');
const router = express.Router ();

const Movie = require ('../models/movie.model');

router.post ('', async (req, res) => {
  try {
    const movie = await Movie.create (req.body);
    return res.status (201).json ({movie});
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

router.get ('/:actor', async (req, res) => {
  try {
    const movies = await Movie.find ().lean ().exec ();

    let pert = movies.filter (act => {
      return act.actors.includes (req.params.actor);
    });

    return res.status (201).json ({pert});
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});
module.exports = router;
