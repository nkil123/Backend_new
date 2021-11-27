const express = require ('express');

const User = require ('../models/users.model');

const router = express.Router ();

router.post ('', async (req, res) => {
  try {
    const users = await User.create (req.body);

    return res.status (201).send (users);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

router.get ('', async (req, res) => {
  try {
    const userss = await User.find ().lean ().exec ();

    return res.status (201).send (userss);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});
router.get ('/:id', async (req, res) => {
  try {
    const users = await User.findById (req.params.id).lean ().exec ();
    console.log (users);
    let aa = users.book_ids;
    console.log (aa);
    aa.forEach (book => {
      console.log (book.book_name);
    });

    return res.status (201).send (users);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});
router.get ('/checkout/books', async (req, res) => {
  try {
    const users = await User.find ().lean ().exec ();
    let arr = [];

    users.forEach (userr => {
      console.log (userr.book_id);
      let bbii = userr.book_id;

      if (!arr.includes (bbii.book_name)) {
        arr.push (bbii.book_name);
      }
    });

    return res.status (201).send (arr);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});
router.patch ('/:id', async (req, res) => {
  try {
    const users = await User.findByIdAndUpdate (req.params.id, req.body, {
      new: true,
    })
      .lean ()
      .exec ();

    return res.status (201).send (users);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

router.delete ('/:id', async (req, res) => {
  try {
    const users = await User.findByIdAndDelete (req.params.id).lean ().exec ();

    return res.status (201).send (users);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

module.exports = router;
