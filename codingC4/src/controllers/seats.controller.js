const express = require ('express');
const router = express.Router ();

const Seat = require ('../models/seats.model');

router.post ('', async (req, res) => {
  try {
    const seat = await Seat.create (req.body);
    return res.status (201).json ({seat});
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

router.get ('', async (req, res) => {
  try {
    const seats = await Seat.findOne ()
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
    arr.push (seats);
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
    const seats = await Seat.findOne ()
      .select ({movie: 1})
      .populate ('movie')
      .lean ()
      .exec ();
    let arr = [];
    arr.push (seats);
    let seat_id = arr.filter (m => {
      return m._id == req.params.id;
    });

    return res.status (201).json ({seat_id});
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

module.exports = router;
