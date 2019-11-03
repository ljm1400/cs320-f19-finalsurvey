  
import React from 'react'
import Question from './Question'

export default function QuestionList({ questions}) {
  return (
    // todos.map(todo => {
    //   return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
    // })
    questions.map(question => {
      return <Question key={question.key} question={question}/>
    })
  )
}

// questions inside the QuestionList({}) comes from where this is called
// so this is coming from MainContent.js where this is actually called