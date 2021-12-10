const express = require ('express');
const router = express.Router ();
const Product = require ('../models/product.model');
const redis = require ('../configs/connection-redis');

router.get ('', (req, res) => {
  redis.get ('all_products', async function (err, products) {
    console.log ('all_products', products);
    if (err) console.log (err);

    if (products) return res.status (200).send (JSON.parse (products));

    const all_products = await Product.find ().lean ().exec ();

    redis.set ('all_products', JSON.stringify (all_products));

    return res.status (200).send (all_products);
  });
});
router.post ('', async (req, res) => {
  const product = await Product.create (req.body);
  const all_products = await Product.find ().lean ().exec ();

  redis.set ('all_products', JSON.stringify (all_products));

  return res.status (201).send (product);
});

router.get ('/:id', (req, res) => {
  redis.get (`all_products.${req.params.id}`, async function (err, productt) {
    if (productt) return res.status (200).send (JSON.parse (productt));

    const product = await Product.findById (req.params.id).lean ().exec ();

    redis.set (`all_products.${req.params.id}`, JSON.stringify (product));

    return res.status (200).send (product);
  });
});

router.patch ('/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate (req.params.id, req.body, {
    new: true,
  });

  redis.set (`all_products.${req.params.id}`, JSON.stringify (product));

  const all_products = await Product.find ().lean ().exec ();
  redis.set ('all_products', JSON.stringify (all_products));

  return res.status (201).send (product);
});
router.delete ('/:id', async (req, res) => {
  const product = await Product.findByIdAndDelete (req.params.id);

  redis.del (`all_products.${req.params.id}`);

  const all_products = await Product.find ().lean ().exec ();
  redis.set ('all_products', JSON.stringify (all_products));

  return res.status (201).send (product);
});
module.exports = router;
