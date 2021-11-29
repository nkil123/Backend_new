const express = require ('express');

const Skill = require ('../models/skills.model');

const router = express.Router ();

router.post ('', async (req, res) => {
  try {
    const skill = await Skill.create (req.body);

    return res.status (201).send (skill);
  } catch (e) {
    return res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

router.get ('', async (req, res) => {
  try {
    const skills = await Skill.find ().lean ().exec ();

    return res.status (201).send (skills);
  } catch (e) {
    return res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

module.exports = router;
