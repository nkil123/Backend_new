const multer = require ('multer');
const path = require ('path');

const storage = multer.diskStorage ({
  destination: function (req, file, cb) {
    cb (null, path.join (__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now () + '-' + Math.round (Math.random () * 1e9);
    cb (null, uniquePrefix + '-' + file.originalname);
  },
});

function fileFilter (req, file, cb) {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb (null, true);
  } else {
    // To accept the file pass `true`, like so:
    cb (null, true);
  }

  // You can always pass an error if something goes wrong:
}
module.exports = multer ({storage, fileFilter});
