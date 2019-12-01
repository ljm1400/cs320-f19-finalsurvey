import React, {useState} from 'react'
import '../css/style.css'

export default function Question({ question,toggleQuestion, radio }) {
  
  // var [a,b] = useState('radio');
  // a = radio;
  function handleQuestionClick() {
    toggleQuestion(question.id, 'remove')
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
        return <label className="radioButtons">
        Option 1<input style={{margin:10}} type="input"></input> <br></br>
        Option 2<input style={{margin:10}} type="input"></input> <br></br>
        Option 3<input style={{margin:10}} type="input"></input> <br></br>
        Option 4<input style={{margin:10}} type="input"></input> <br></br>
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
        // need to return label for the question type
        return <></>
        //return <p style={{margin:20, fontSize:15}}>Text Question</p>
        //<input style={{margin:20, fontSize:15}} type="text"/>
      }
  }

  return (
    <>
      <td>
        {question.name}
        <br></br>
        <Question></Question>
      </td>
      <td>{question.category}</td>
      <td>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <button type="button" onClick={handleQuestionClick}><i class="fa fa-trash"></i></button>
      </td>
    </>
  )

  /**
  return (
    <div style={{margin:10, padding:10}}>
      {/* <label>
        <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
        {todo.name}
      </label> }
      <label style={{margin:20}} >{question.name + '  (Category: '+question.category+')'}</label>
      <Question></Question>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <button type="button" onClick={handleQuestionClick}><i class="fa fa-trash"></i></button>
    </div>
  )
  */
}