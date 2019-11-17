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
  const companyID = req.body.companyID;
  const positionTitle = req.body.positionTitle;
  const companyName = req.body.companyName;
  const employeeID = req.body.employeeID;
  const managerID = req.body.managerID;
  const email = req.body.email;
  const startDate = req.body.startDate;

  const newUser = new User({
    firstName,
    midName,
    lastName,
    companyID,
    positionTitle,
    companyName,
    employeeID,
    managerID,
    email,
    startDate
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;