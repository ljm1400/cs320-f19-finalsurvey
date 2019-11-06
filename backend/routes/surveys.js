const router = require('express').Router();
let Survey = require('../models/surveys.model');

router.route('/').get((req, res) => {
  Survey.find()
    .then(surveys => res.json(surveys))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  // const title_survey = req.body.title_survey;
  // const description_survey = req.body.description_survey;
  // const close_date = Date.parse(req.body.close_date);
  // const issued_date = Date.parse(req.body.issued_date);
  // const issued_by = Number (req.body.issued_by)
  // const answers = req.body.questions;
  const title_survey = "Survey1";
  const description_survey = ""
  const close_date = "2015-03-25" 
  const issued_date = "2015-03-25" 
  const issued_by = 1;
  const answers = [1,2];
  const questions = req.body.questions;

  const newSurvey = new Survey({
    title_survey,
    description_survey,
    questions,
    answers,
    close_date,
    issued_date,
    issued_by,
  });

  newSurvey.save()
  .then(() => ('Survey added' + res.json(questions)))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Survey.findById(req.params.id)
    .then(survey => res.json(survey))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Survey.findByIdAndDelete(req.params.id)
    .then(() => res.json('Survey deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').post((req, res) => {
  Survey.findById(req.params.id)
    .then(survey => {
      survey.title_survey = req.body.title_survey,
      description_survey = req.body.description_survey,
      questions = req.body.questions,
      answers = req.body.answers,
      close_date = Date.parse(req.body.close_date),
      issued_date = Date.parse(req.body.issued_date),
      issued_by = Number(req.body.issued_by),

      Survey.save()
        .then(() => res.json('Survey updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;