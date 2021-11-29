const express = require ('express');

const Job = require ('../models/jobs.model');

const router = express.Router ();

router.post ('', async (req, res) => {
  try {
    const job = await Job.create (req.body);

    return res.status (201).send (job);
  } catch (e) {
    return res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

router.get ('', async (req, res) => {
  console.log ('getall');
  try {
    const jobs = await Job.find ().lean ().exec ();

    return res.status (201).send (jobs);
  } catch (e) {
    return res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

//get all jobs in a particular city which matches a particular skill;

router.get ('/:city/:skill', async (req, res) => {
  console.log ('city and skill filter');
  try {
    const jobs = await Job.find ()
      .populate ('company_id')
      .populate ('skill_id')
      .lean ()
      .exec ();
    let cityFilter = jobs.filter (job => {
      return job.company_id.location === req.params.city && skill (job);
    });

    function skill (job) {
      let skills = job.skill_id;
      let result = false;
      skills.forEach (sk => {
        if (sk.skill === req.params.skill) {
          console.log (sk.skill);
          result = true;
        }
      });

      return result;
    }
    console.log (cityFilter);

    return res.status (201).send (cityFilter);
  } catch (e) {
    return res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

///find all the jobs that are available as Work from home.

router.get ('/work_from_home', async (req, res) => {
  console.log ('work from home');

  try {
    const jobs = await Job.find ({location: {$eq: 'work from home'}})
      .lean ()
      .exec ();

    return res.status (201).send (jobs);
  } catch (e) {
    return res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

//find all the jobs that will accept a notice period of 2 months.

router.get ('/notice/*/:number', async (req, res) => {
  console.log ('notice period');
  try {
    const jobs = await Job.find ({notice_p: {$eq: req.params.number}})
      .lean ()
      .exec ();
    // console.log (jobs);
    return res.status (201).send (jobs);
  } catch (e) {
    return res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

//find all jobs by sorting the jobs as per their rating.

router.get ('/*/sort/:rating', async (req, res) => {
  console.log ('rating');
  try {
    const jobs = await Job.find ().lean ().exec ();
    //   .sort ({rating: req.params.rating})

    jobs.sort ((a, b) => a.rating - b.rating);

    return res.status (201).send (jobs);
  } catch (e) {
    return res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

// an api to get details of the company.
router.get ('/company', async (req, res) => {
  console.log ('hii');
  try {
    const jobs = await Job.find ({}).populate ('company_id').lean ().exec ();

    return res.status (201).send (jobs);
  } catch (e) {
    return res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

//company with most job openings

router.get ('/company/*/*/mostjobs', async (req, res) => {
  console.log ('hii');
  try {
    const jobs = await Job.find ({}, {company_id: 1, job_name: 1})
      .populate ('company_id')
      .lean ()
      .exec ();

    let obj = {};
    jobs.forEach (job => {
      if (obj[job.company_id.company] === undefined) {
        obj[job.company_id.company] = 1;
      } else {
        let prev = obj[job.company_id.company];
        obj[job.company_id.company] = prev + 1;
      }
    });
    let max = null, name;
    for (k in obj) {
      if (max == null || max < obj[k]) {
        max = obj[k];
        name = k;
      }
    }
    const mostjob = jobs.filter (job => {
      return job.company_id.company === name;
    });

    console.log (`${name} has ${max} openings`);
    return res.status (201).send (mostjob);
  } catch (e) {
    return res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

router.delete ('/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete (req.params.id).lean ().exec ();

    return res.status (201).send (job);
  } catch (e) {
    return res.status (500).send ({message: e.message, status: 'Failed'});
  }
});

module.exports = router;
