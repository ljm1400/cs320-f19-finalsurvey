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
  companyId: {
    type: Number,
    required: true
  },
  positionTitle:{
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  employeeId:{
    type: Number,
    required: true
  },
  managerId: {
    type: Number,
    required: false
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
  },
  openSurveys: {
    type: Array,
    required: false
  },
  closedSurveys: {
    type: Array,
    required: false
  }
}, {
  timestamps: true
});

const User = mongoose.model('employees', userSchema);

module.exports = User;