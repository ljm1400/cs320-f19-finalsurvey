const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  midName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: true
  },
  manager_ID: {
    type: Number,
    required: [true, "ID is required"]
  },
  email: {
    type: String,
    required: [true, "Missing email"],
    match: [/\S+@\S+\.\S+/, 'Invalid email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Missing password"]
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"]
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;