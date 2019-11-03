import React from 'react'

export default function Question({ question,toggleQuestion }) {
  
  function handleQuestionClick() {
    toggleQuestion(question.id)
  }
  
  return (
    <div>
      {/* <label>
        <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
        {todo.name}
      </label> */}
      {question.name}
      <input type="text"/>
      <input type="checkbox" checked={question.complete} onChange={handleQuestionClick} />
    </div>
  )
}