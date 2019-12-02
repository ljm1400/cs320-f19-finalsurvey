const router = require('express').Router();
let Survey = require('../models/surveys.model');

router.route('/').get((req, res) => {
  Survey.find()
    .then(surveys => res.json(surveys))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title_survey = req.body.title_survey;
  const description_survey = ""
  const close_date = req.body.close_date
  const issued_date = req.body.issued_date
  const issued_by = req.body.issued_by
  const questions = req.body.questions;
  const answers = [];

  const newSurvey = new Survey({
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

router.route('/:id').delete((req, res) => {
  Survey.findByIdAndDelete(req.params.id)
    .then(() => res.json('Survey deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addAnswers/:id').post((req, res) => {
  Survey.findById(req.params.id)
    .then(survey => {
      if(survey.answers === null){
        survey.answers = req.body.answers
      }
      else survey.answers.push(req.body.answers)


      survey.save()
        .then(() => res.json('Survey updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;