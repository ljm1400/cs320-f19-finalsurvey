const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../models/users.model');

// @route   POST /auth
// @desc    Auth user
// @access  Public
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if(!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if(!user) return res.status(400).json({ msg: 'User Does not exist' });

      // Validate password
      isMatch = (password == user.password);
        
        if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        jwt.sign(
        { id: user.id },
        config.get('jwtSecret'),
        { expiresIn: 7200 },
        (err, token) => {
            if(err) throw err;
            res.json({
                token,
                user: {
                    id: user.id,
                    firstName: user.firstName,
                    email: user.email,
                    companyId: user.companyId,
                    employeeId: user.employeeId,
                    companyName: user.companyName,
                    managerId: user.managerId,
                    companyId: user.companyId,
                    positionTitle: user.positionTitle
                }
            });
        }
        )
    })
});

// @route   GET auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});

module.exports = router;