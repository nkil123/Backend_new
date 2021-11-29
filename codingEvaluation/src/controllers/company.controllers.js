const express = require ('express');

const Company = require ('../models/company.model');

const router = express.Router ();

router.post ('', async (req, res) => {
  try {
    const company = await Company.create (req.body);

    return res.status (201).send (company);
  } catch (e) {
    return res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

router.get ('', async (req, res) => {
  try {
    const companys = await Company.find ().lean ().exec ();

    return res.status (201).send (companys);
  } catch (e) {
    return res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

module.exports = router;
