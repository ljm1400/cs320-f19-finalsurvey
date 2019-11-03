  
import React from 'react'
import Question from './Question'

export default function QuestionList({ questions, toggleQuestion}) {
  return (
    questions.map(question => {
      return <Question key={question.id} toggleQuestion={toggleQuestion} question={question} />
    })
  )
}

// questions inside the QuestionList({}) comes from where this is called
// so this is coming from MainContent.js where this is actually called