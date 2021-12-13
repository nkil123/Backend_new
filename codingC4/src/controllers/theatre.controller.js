const express = require ('express');
const router = express.Router ();

const Theatre = require ('../models/theatre.model');

router.post ('', async (req, res) => {
  try {
    const theatre = await Theatre.create (req.body);
    return res.status (201).json ({theatre});
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

router.get ('', async (req, res) => {
  try {
    const theatre = await Theatre.find ().lean ().exec ();
    return res.status (201).json ({theatre});
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});
module.exports = router;
