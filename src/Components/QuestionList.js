  
import React from 'react'
import Question from './Question'
import '../css/style.css'

function randerTableHeader(){
  let header = ["Questions", "Category", "Option"]
  return header.map((key, index) => {
    return <th key={index}>{key}</th>
  })
}

function randerTableItems(questions, toggleQuestion, radio){
  return questions.map((ques, index) => {
    // temporarily hardcode survey answers
    return (
      <tr>
        <td>
          {ques.name}
          <br></br>
          Test
        </td>
        <td>{ques.category}</td>
        <td>{toggleQuestion}</td>
      </tr>
    )
  })
}

export default function QuestionList({ questions, toggleQuestion, radio}) {
  return (
    
    questions.map(question => {
      return <Question key={question.id} toggleQuestion={toggleQuestion} question={question} radio={radio}/>
    })
   /**
   <div>
     <table id='surveys'>
       <tbody>
         <tr>{randerTableHeader()}</tr>
         {randerTableItems(questions, toggleQuestion, radio)}
       </tbody>
     </table>
   </div>
   */
  )
}

// questions inside the QuestionList({}) comes from where this is called
// so this is coming from MainContent.js where this is actually called