const express = require ('express');
const fs = require ('fs');
const Gallery = require ('../models/gallery.model');
const upload = require ('../middleware/file-upload');
const router = express.Router ();

router.post ('/', upload.array ('myImages', 10), async (req, res) => {
  try {
    //
    const filePaths = req.files.map (file => file.path);

    const gallery = await Gallery.create ({
      user_id: req.body.user_id,
      images_url: filePaths,
    });

    return res.status (201).send ({gallery});
  } catch (e) {
    return res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

router.get ('/', async (req, res) => {
  try {
    const gallery = await Gallery.find ().populate ('user_id').lean ().exec ();

    return res.status (201).send ({gallery});
  } catch (e) {
    return res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

router.delete ('/:id', async (req, res) => {
  try {
    const newUser = await Gallery.findByIdAndDelete (req.params.id)
      .lean ()
      .exec ();
    console.log (newUser);
    let arr = newUser.images_url;
    console.log (arr);
    const removeFile = (fileName, prevPath) => {
      fs.unlink (prevPath, function (error) {
        if (error) {
          throw error;
        }
        console.log ('Deleted filename', fileName);
      });
    };
    arr.forEach (image => {
      let prevPath = image;
      removeFile ('legends', prevPath);
    });

    return res.status (201).send ({newUser});
  } catch (e) {
    return res.status (500).send ({message: e.message, status: 'Failed'});
  }
});
module.exports = router;
