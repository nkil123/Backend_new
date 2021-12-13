const express = require ('express');
const router = express.Router ();

const Show = require ('../models/shows.model');

router.post ('', async (req, res) => {
  try {
    const show = await Show.create (req.body);
    return res.status (201).json ({show});
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

router.get ('/:movie', async (req, res) => {
  try {
    const shows = await Show.findOne ()
      .select ({movie: 1})
      .populate ({
        path: 'movie',
        select: {
          name: 1,
        },
      })
      .populate ({
        path: 'screen',
        populate: {
          path: 'theatre',
        },
      })
      .lean ()
      .exec ();
    let arr = [];
    arr.push (shows);
    let movieName = arr.filter (m => {
      return m.movie.name == req.params.movie;
    });

    return res.status (201).json ({movieName});
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});
router.get ('/*/:id', async (req, res) => {
  try {
    const shows = await Show.findOne ()
      .select ({movie: 1})
      .populate ('movie')
      .lean ()
      .exec ();
    let arr = [];
    arr.push (shows);
    let show_id = arr.filter (m => {
      return m._id == req.params.id;
    });

    return res.status (201).json ({show_id});
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

module.exports = router;
