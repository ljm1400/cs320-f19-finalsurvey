const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const firstName = req.body.firstName;
  const midName  = req.body.midName;
  const lastName = req.body.lastName;
  const manager_ID = req.body.manager_ID;
  const email = req.body.email;
  const startDate = req.body.startDate;

  const newUser = new User({
    firstName,
    midName,
    lastName,
    manager_ID,
    email,
    startDate
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;