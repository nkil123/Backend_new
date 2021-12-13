const path = require ('path');
const multer = require ('multer');

const storage = multer.diskStorage ({
  destination: function (req, file, callback) {
    callback (null, path.join (__dirname, '../uploads'));

    //(error,uploads_dir)

    //path.join((absolute path to file_upload),"going up and comming to uploads folder")

    //we are giving path to store the folder/fil to upload
  },
  filename: function (req, file, callback) {
    //unique prefix so that there is no duplicates
    const uniquePrefix = Date.now () + '-' + Math.round (Math.random () * 1e9);
    callback (null, uniquePrefix + '-' + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  //mimetype specifies type of file comming
  if (file.mimetype === 'image/jpeg' || file.mimetype == 'image/png') {
    callback (null, true);
  } else {
    callback (null, false);
  }
};

module.exports = multer ({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, //1024 bytes * 1204 kbytes * 5 mb
  },
  fileFilter,
});
