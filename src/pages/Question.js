import React from 'react'

export default function Question({ question }) {
  
  // function handleTodoClick() {
  //   toggleTodo(todo.id)
  // }
  
  return (
    <div>
      {/* <label>
        <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
        {todo.name}
      </label> */}
      {question.name}
      <input type="text"/>
      <input type="checkbox"/>
    </div>
  )
}