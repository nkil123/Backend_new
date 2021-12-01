const express = require ('express');
const fs = require ('fs');
const User = require ('../models/user.model');
const upload = require ('../middleware/file-upload');
const router = express.Router ();

router.post ('/', upload.single ('profilePic'), async (req, res) => {
  try {
    const user = await User.create ({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      profile_pic: req.file.path,
    });

    return res.status (201).send ({user});
  } catch (e) {
    return res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

router.patch ('/:id', upload.single ('profilePic'), async (req, res) => {
  try {
    const prevUser = await User.findById (req.params.id).lean ().exec ();
    const prevPath = prevUser.profile_pic;

    console.log (prevUser, prevPath);

    //delete prevfile using prevPath.
    // var fileName = prevUser.first_name;

    const removeFile = fileName => {
      fs.unlink (`${prevPath}`, function (error) {
        if (error) {
          throw error;
        }
        console.log ('Deleted filename', fileName);
      });
    };
    removeFile ();
    console.log (req.file.path);
    const newUser = await User.findByIdAndUpdate (
      {_id: req.params.id},
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        profile_pic: req.file.path,
      }
    );

    return res.status (201).send ({newUser});
  } catch (e) {
    return res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

router.get ('/', async (req, res) => {
  try {
    const user = await User.find ().lean ().exec ();

    return res.status (201).send ({user});
  } catch (e) {
    return res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

router.delete ('/:id', async (req, res) => {
  try {
    const newUser = await User.findByIdAndDelete (req.params.id)
      .lean ()
      .exec ();
    const prevPath = newUser.profile_pic;
    const removeFile = fileName => {
      fs.unlink (`${prevPath}`, function (error) {
        if (error) {
          throw error;
        }
        console.log ('Deleted filename', fileName);
      });
    };
    removeFile ();
    // delete prevfile using prevPath.

    return res.status (201).send ({newUser});
  } catch (e) {
    return res.status (500).send ({message: e.message, status: 'Failed'});
  }
});
module.exports = router;
