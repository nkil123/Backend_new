const express = require ('express');

const {body, validationResult} = require ('express-validator');

const User = require ('../models/user.model');

const router = express.Router ();

router.post (
  '/',
  body ('first_name')
    .isLength ({
      min: 4,
      max: 20,
    })
    .withMessage (
      'first name is required with atleast 4 chars and max 20 char'
    ),
  body ('last_name').notEmpty ().withMessage ('last_name is required'),
  body ('email').custom (async value => {
    const isEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test (value);

    if (!isEmail) {
      throw new Error ('please Enter proper email');
    }

    const uniq = await User.findOne ({
      email: value,
    })
      .lean ()
      .exec ();

    if (uniq) {
      throw new Error ('email already exist');
    }

    return true;
  }),
  body ('pincode').custom (async value => {
    if (typeof value !== 'number') {
      throw new Error ('please enter a number');
    }
    if (value.toString ().length < 6 || value.toString ().length > 6) {
      throw new Error ('Enter the pincode with 6 numbers');
    }
    return true;
  }),
  body ('age').custom (async value => {
    if (typeof value !== 'number') {
      throw new Error ('please enter a number');
    }
    if (value <= 1 || value >= 100) {
      throw new Error ('Enter the numbers between 1 and 100');
    }
    return true;
  }),
  body ('gender').custom (async value => {
    console.log (value);
    if (
      !(value === 'Male' ||
        value === 'Female' ||
        value === 'Others' ||
        value === 'male' ||
        value === 'female' ||
        value === 'others')
    ) {
      throw new Error ('Please Enter Valid Gender');
    }
    return true;
  }),
  async (req, res) => {
    // console.log (body ('name'));

    const errors = validationResult (req);

    //error contains {msg,param,location}

    if (!errors.isEmpty ()) {
      let newErrors = errors.array ().map (({msg, param, location}) => {
        return {
          [param]: msg,
        };
      });

      return res.status (400).json ({
        errors: newErrors,
      });
    }
    //400 series front mistake.
    try {
      const user = await User.create (req.body);

      return res.status (201).send ({
        user,
      });
    } catch (e) {
      return res.status (500).send ({
        message: e.message,
        status: 'Failed',
      });
    }
  }
);

// router.patch ('/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate (req.body).lean ().exec ();

//     return res.status (201).send ({user});
//   } catch (e) {
//     return res.status (500).send ({message: e.message, status: 'Failed'});
//   }
// });

router.get ('/', async (req, res) => {
  try {
    const user = await User.find ().lean ().exec ();

    return res.status (201).send ({
      user,
    });
  } catch (e) {
    return res.status (500).send ({
      message: e.message,
      status: 'Failed',
    });
  }
});

// router.delete ('/:id', async (req, res) => {
//   try {
//     const newUser = await User.findByIdAndDelete (req.params.id)
//       .lean ()
//       .exec ();

//     // delete prevfile using prevPath.

//     return res.status (201).send ({newUser});
//   } catch (e) {
//     return res.status (500).send ({message: e.message, status: 'Failed'});
//   }
// });

module.exports = router;
