import React from 'react'

export default function Question({ question,toggleQuestion }) {
  
  function handleQuestionClick() {
    toggleQuestion(question.id)
  }
  const a = 0;
  function Question(a){
    if(a === 1){
      return <label>
      True <input style={{margin:20}} type="radio"></input>
      False <input style={{margin:20}} type="radio"></input>
        </label>
    }
    else{
      return <label>
      1<input style={{margin:20}} type="radio"></input>
      2<input style={{margin:20}} type="radio"></input>
        </label>
    }
  }
  
  return (
    <div style={{margin:20}}>
      {/* <label>
        <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
        {todo.name}
      </label> */}
      {question.name}
      <input style={{margin:20, fontSize:20}} type="text"/>
      Delete <input style={{margin:20}} type="checkbox" checked={question.complete} onChange={handleQuestionClick} />
      <Question a={1}></Question>
    </div>
  )
}