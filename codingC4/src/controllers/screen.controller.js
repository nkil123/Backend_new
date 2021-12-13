const express = require ('express');
const router = express.Router ();

const Screen = require ('../models/screen.model');

router.post ('', async (req, res) => {
  try {
    const screen = await Screen.create (req.body);
    return res.status (201).json ({screen});
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});
router.get ('', async (req, res) => {
  try {
    const screens = await Screen.find ().lean ().exec ();
    return res.status (201).json ({screens});
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

module.exports = router;
