const router = require('express').Router();
let Survey = require('../models/surveys.model');

router.route('/').get((req, res) => {
  Survey.find()
    .then(surveys => res.json(surveys))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const survey_id = 1;
  const title_survey = req.body.title_survey;
  const description_survey = ""
  const close_date = req.body.close_date
  const issued_date = req.body.issue_date
  const issued_by = req.body.issued_by
  const questions = req.body.questions;
  const answers = {};

  const newSurvey = new Survey({
    survey_id,
    title_survey,
    description_survey,
    questions,
    answers,
    close_date,
    issued_date,
    issued_by
  });

  newSurvey.save()
  .then(() => (res.json(newSurvey)))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Survey.findById(req.params.id)
    .then(survey => res.json(survey))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('delete/:id').delete((req, res) => {
  Survey.findByIdAndDelete(req.params.id)
    .then(() => res.json('Survey deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('update/:id').post((req, res) => {
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