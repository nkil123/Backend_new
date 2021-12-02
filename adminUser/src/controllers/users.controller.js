const express = require ('express');

const User = require ('../models/product.model');

const sendMail = require ('../utils/send.mail');

const router = express.Router ();

router.post ('/', async (req, res) => {
  try {
    const user = await User.create (req.body);
    const admins = await User.find ({role: {$eq: 'admin'}}).lean ().exec ();

    sendMail (
      `admins@ad.com`,
      `${user.email}`,
      `Welcome to nk system ${user.first_name} ${user.last_name}`,
      `Hi ${user.first_name}, Please confirm your email address`,
      `<p>Hi ${user.first_name}, Please confirm your email address</p>`
    );

    let arr = [];

    admins.forEach (async admin => {
      arr.push (admin.email);
    });

    sendMail (
      `admins@ad.com`,
      arr,
      `${user.first_name} ${user.last_name} has registered with us`,
      `Please welcome ${user.first_name} ${user.last_name}`,
      `Please welcome ${user.first_name} ${user.last_name}`
    );

    return res.status (201).send (user);
  } catch (e) {
    res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

router.get ('/', async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const size = +req.query.size || 7;

    const skip = (page - 1) * size;

    const users = await User.find ({role: {$eq: 'user'}})
      .skip (skip)
      .limit (size)
      .lean ()
      .exec ();

    const totalPages = Math.ceil (
      (await User.find ().countDocuments ()) / size
    );

    return res.status (201).send ({users, totalPages});
  } catch (e) {
    res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

module.exports = router;
