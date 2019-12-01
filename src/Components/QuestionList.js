
import React from 'react'
import Question from './Question'


function randerTableHeader() {
  let header = ["Question", "Category", "Option"]
  return header.map((key, index) => {
    return <th key={index}>{key}</th>
  })
}

function randerTableItems(questions, toggleQuestion, radio) {
  return (
    questions.map(question => {
      return (
        <tr>
          <Question key={question.id} toggleQuestion={toggleQuestion} question={question} radio={radio} />
        </tr>
      )
    })
  )
}

export default function QuestionList({ questions, toggleQuestion, radio }) {
  return (
    <div>
      <table id='surveys'>
        <tbody>
          <tr>{randerTableHeader()}</tr>
          {randerTableItems(questions, toggleQuestion, radio)}
        </tbody>
      </table>
    </div>
  )
}

// questions inside the QuestionList({}) comes from where this is called
// so this is coming from MainContent.js where this is actually called