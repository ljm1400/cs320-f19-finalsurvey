import React, {useState} from 'react'

export default function Question({ question,toggleQuestion }) {
  
  function handleQuestionClick() {
    toggleQuestion(question.id)
  }

  var [a, setCount] = useState(1);
  // var a = 1;
  function Question(){
      return <label>
      True<input style={{margin:20}} type="radio"></input>
      False<input style={{margin:20}} type="radio"></input>
        </label>
  }

  return (
    <div style={{margin:10}}>
      {/* <label>
        <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
        {todo.name}
      </label> */}
      {question.name}
      <input style={{margin:20, fontSize:15}} type="text"/>
      <Question></Question>
      Delete question<input style={{margin:20}} type="checkbox" checked={question.complete} onChange={handleQuestionClick} />
    </div>
  )
}