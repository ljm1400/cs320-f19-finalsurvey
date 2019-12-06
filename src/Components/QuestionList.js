
import React from 'react'
import Question from './Question'


function randerTableHeader() {
  let header = ["Question", "Type", "Category", "Option"]
  return header.map((key, index) => {
    return <th key={index}>{key}</th>
  })
}

function randerTableItems(questions, toggleQuestion, radio, getOptions) {
  return (
    questions.map(question => {
      return (
        <tr>
          <Question key={question.id} toggleQuestion={toggleQuestion} question={question} radio={radio} getOptions = {getOptions}/>
        </tr>
      )
    })
  )
}

export default function QuestionList({ questions, toggleQuestion, radio, getOptions }) {
  return (
    <div>
      <table id='surveys'>
        <tbody>
          <tr>{randerTableHeader()}</tr>
          {randerTableItems(questions, toggleQuestion, radio, getOptions)}
        </tbody>
      </table>
    </div>
  )
}

// questions inside the QuestionList({}) comes from where this is called
// so this is coming from MainContent.js where this is actually called