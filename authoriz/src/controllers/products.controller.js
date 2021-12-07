const express = require ('express');

const Product = require ('../models/product.model');

const authenticate = require ('../middleware/authenticate');
const authorise = require ('../middleware/authorise');

const router = express.Router ();

router.post (
  '/',
  authenticate,
  authorise (['seller', 'admin']),
  async (req, res) => {
    try {
      const user = req.user;
      console.log (user);
      const product = await Product.create ({
        name: req.body.name,
        price: req.body.price,
        seller: user.user._id,
      });

      return res.status (201).json ({product});
    } catch (e) {
      return res.status (500).json ({status: 'failed', message: e.message});
    }
  }
);

router.get ('/', async (req, res) => {
  try {
    const products = await Product.find ().populate ('seller').lean ().exec ();

    return res.send (products);
  } catch (e) {
    return res.status (500).json ({status: 'failed', message: e.message});
  }
});
router.get ('/:id', async (req, res) => {
  try {
    const product = await Product.findById (req.params.id).lean ().exec ();
    console.log (product);
    return res.send (product);
  } catch (e) {
    return res.status (500).json ({status: 'failed', message: e.message});
  }
});
// router.delete ('/:id', authorise (['seller', 'admin']), async (req, res) => {
//   try {
//     const user = req.user;
//     console.log ('user:', user);
//     console.log (req.params.id);
//     const product = await Product.findByIdAndDelete (req.params.id)
//       .lean ()
//       .exec ();
//     console.log (product);
//     return res.send (product);
//   } catch (e) {
//     return res.status (500).json ({status: 'failed', message: e.message});
//   }
// });

router.patch (
  '/:id',
  authenticate,
  authorise (['seller', 'admin']),
  async (req, res) => {
    try {
      const user = req.user;
      console.log (req.user);
      const product = await Product.findByIdAndUpdate (
        req.params.id,
        {
          name: req.body.name,
          price: req.body.price,
          seller: user.user._id,
        },
        {new: true}
      )
        .lean ()
        .exec ();

      return res.status (201).json ({product});
    } catch (e) {
      return res.status (500).json ({status: 'failed', message: e.message});
    }
  }
);
router.delete (
  '/:id',
  authenticate,
  authorise (['seller', 'admin']),
  async (req, res) => {
    try {
      const user = req.user;
      console.log ('user:', user);
      console.log (req.params.id);
      const product = await Product.findByIdAndDelete (req.params.id)
        .lean ()
        .exec ();
      console.log (product);
      return res.send (product);
    } catch (e) {
      return res.status (500).json ({status: 'failed', message: e.message});
    }
  }
);

module.exports = router;
