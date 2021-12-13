const express = require('express');
const Product = require('../models/product.model');
const upload = require('../middleware/file-upload');
const router = express.Router();

router.get('/', async function (req, res) {
  const products = await Product.find().lean().exec();

  return res.render('products/all', {
    products,
  });
});

// router.post ('/', upload.any ('productImages'), async (req, res) => {
//   try {
//     const filePaths = req.files.map (file => file.path);
//     const product = await Product.create ({
//       name: req.body.name,
//       price: req.body.price,
//       image_url: filePaths,
//     });

//     return res.status (201).send ({product});
//   } catch (e) {
//     return res.status (500).send ({message: e.message, status: 'Failed'});
//   }
// });
// router.post ('/multiple', upload.any ('productImages'), async (req, res) => {
//   try {
//     //
//     const filePaths = req.files.map (file => file.path);
//     const product = await Product.create ({
//       name: req.body.name,
//       price: req.body.price,
//       image_url: filePaths,
//     });

//     return res.status (201).send ({product});
//   } catch (e) {
//     return res.status (500).send ({message: e.message, status: 'Failed'});
//   }
// });

module.exports = router;