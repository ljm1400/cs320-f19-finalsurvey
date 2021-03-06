import React, {useState} from 'react'
import '../css/style.css'

export default function Question({ question,toggleQuestion, radio, getOptions}) {
  
  // var [a,b] = useState('radio');
  // a = radio;
  function handleQuestionClick() {
    toggleQuestion(question.id, 'remove')
  }
  let options = []

  function handleMC(e){
    let a = e.target.value;

    if(e.target.name === "option1"){
      options[0] = a
    }
    if(e.target.name === "option2"){
      options[1] = a
    }
    if(e.target.name === "option3"){
      options[2] = a
    }
    if(e.target.name === "option4"){
      options[3] = a
    }
  }

  function Question(){
    if(question.type === 'Multiple Choice'){
      return <label>
        Option 1<input style={{margin:10}} name = "option1" onChange = {e =>handleMC(e)} type="input"></input> <br></br>
        Option 2<input style={{margin:10}} name = "option2" onChange = {e =>handleMC(e)} type="input"></input> <br></br>
        Option 3<input style={{margin:10}} name = "option3" onChange = {e =>handleMC(e)} type="input"></input> <br></br>
        Option 4<input style={{margin:10}} name = "option4" onChange = {e =>handleMC(e)} type="input"></input> <br></br>
      </label>
    }
    else if(question.type === 'Slider'){
      return <>
        <input type="range" name="points" value="3" min="1" max="5" step="1" list="ticks"></input>
        <datalist id="ticks">
          <option>1</option>
          <option>3</option>
          <option>5</option>
        </datalist>
        <p>1)Strongly Disagree 3) No opinion 5)Strongly Agree</p>
      </>
    }
    else{
      return <></>
    }
  }

  return (
    <>
      <td>
        {question.name}
        <br></br>
        <Question></Question>
      </td>
      <td>{question.type}</td>
      <td>{question.category}</td>
      <td>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <button type="button" onClick={handleQuestionClick}><i className="fa fa-trash"></i></button>
      </td>
      {question.options = options}
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