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
      type: Array,
      required: true,
      default: []
  },
  answers: {
      type: Array,
  },
  issued_date: {
      type: Date,
      requried: true
  },
  close_date: {
      type: Date,
      required: true
  },
  issued_by: {
      type: Number,
      required: false,
  },

}, {
  timestamps: true,
});

const Survey = mongoose.model('Surveys', surveySchema);

module.exports = Survey;