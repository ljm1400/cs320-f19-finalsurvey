const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title_question: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  question_extra_info: {
      type: String,
  },
  question_type: {
      type: String
  },
  question_answers: {
      type: Array,
      required: true
  },
  question_tags:{
      type: Array
  }
}, {
  timestamps: true,
});

const Question = mongoose.model('User', userSchema);

module.exports = Question;