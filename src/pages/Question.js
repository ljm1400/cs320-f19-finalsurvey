import React, {useState} from 'react'

export default function Question({ question,toggleQuestion, radio }) {
  
  function handleQuestionClick() {
    toggleQuestion(question.id)
  }
  // var a = 1;
  function Question(){
      if(radio === 's'){
        // slider
        return <label>
        1<input style={{margin:20}} type="radio"></input>
        2<input style={{margin:20}} type="radio"></input>
          </label>
      }
      else if(radio === 'm'){
        // multiple choice
        return <label>
        Option 1<input style={{margin:10}} type="checkbox"></input>
        Option 2<input style={{margin:10}} type="checkbox"></input>
        Option 3<input style={{margin:10}} type="checkbox"></input>
        Option 4<input style={{margin:10}} type="checkbox"></input>
          </label>
      }
      else if(radio === 'tr'){
        // true false
        return <label>
        True<input style={{margin:20}} type="radio"></input>
        False<input style={{margin:20}} type="radio"></input>
          </label>
      }
      else{
        // text
        return <input style={{margin:20, fontSize:15}} type="text"/>
      }
  }

  return (
    <div style={{margin:10, padding:10}}>
      {/* <label>
        <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
        {todo.name}
      </label> */}
      <label style={{margin:20}} >{question.name}</label>
      <Question></Question>
      <label style={{margin:20}} >Delete Question</label>
      <input style={{marginLeft:20}} type="checkbox" checked={question.complete} onChange={handleQuestionClick} />
    </div>
  )
}