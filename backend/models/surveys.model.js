const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const surveySchema = new Schema({
  title_survey: {
    type: String,
    required: true,
    trim: true,
  },
  description_survey: {
      type: String,
  },
  questions: {
      type: Array
  },
  close_date: {
      type: Date
  },
  issued_by: {
      type: Number,
      required: true,
  },

}, {
  timestamps: true,
});

const Survey = mongoose.model('User', userSchema);

module.exports = Survey;