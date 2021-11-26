const express = require ('express');

const Student = require ('../models/students.model');

const router = express.Router ();

router.post ('', async (req, res) => {
  try {
    const student = await Student.create (req.body);

    return res.status (201).send (student);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

router.get ('', async (req, res) => {
  try {
    const students = await Student.find ()
      .populate ('eval_id')
      .populate ('user_id')
      .lean ()
      .exec ();

    return res.status (201).send (students);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});
router.get ('/evaluation/:evaluation_name', async (req, res) => {
  try {
    const student = await Student.find ()
      .populate ({
        path: 'eval_id',
        populate: {path: 'topic_ids'},
      })
      .populate ('user_id')
      .lean ()
      .exec ();
    let arr = [];
    student.forEach (stu => {
      console.log (stu.eval_id.topic_ids[0].name);
      if (stu.eval_id.topic_ids[0].name === req.params.evaluation_name) {
        arr.push (stu.user_id.first_name);
      }
    });

    return res.status (201).send (arr);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});
router.get ('/topper/:top', async (req, res) => {
  try {
    const student = await Student.find ()
      .populate ({
        path: 'eval_id',
        populate: {path: 'topic_ids'},
      })
      .populate ('user_id')
      .lean ()
      .exec ();
    let arr = [];
    student.forEach (stu => {
      console.log (stu.eval_id.topic_ids[0].name);
      if (stu.eval_id.topic_ids[0].name === req.params.evaluation_name) {
        arr.push (stu.user_id.first_name);
      }
      let newar = [];
      newar.push (stu.marks);
      newar.push (stu.user_id);
      arr.push (newar);
    });
    arr.sort ((a, b) => a[0] - b[0]);
    let topper = arr[arr.length - 1][1];
    return res.status (201).send (topper);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});
router.get ('/:id', async (req, res) => {
  try {
    const student = await Student.findById (req.params.id)
      .populate ('eval_id')
      .populate ('user_id')
      .lean ()
      .exec ();

    return res.status (201).send (student);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});
router.patch ('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate (req.params.id, req.body, {
      new: true,
    })
      .lean ()
      .exec ();

    return res.status (201).send (student);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

router.delete ('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete (req.params.id)
      .lean ()
      .exec ();

    return res.status (201).send (student);
  } catch (e) {
    return res.status (500).json ({message: e.message, status: 'Failed'});
  }
});

module.exports = router;
