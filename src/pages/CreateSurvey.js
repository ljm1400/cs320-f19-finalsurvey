import React, {useState, useRef} from 'react';
import QuestionList from './QuestionList';
import '../css/style.css';

export default function MainContent(){

    const [questions,setQuestions] = useState([{id:1, name:'question', complete:false}])
    // const [todos,setTodos] = useState(['question 1','question 2']) -> this was the earlier version
    // the first argument is the state, and the second is the function we will call on that state
    // so the first will be the questions and the second will be the function which we can call to do something with the questions

    const questionNameRef = useRef()
    function handleAddQuestion(e){
        const name = questionNameRef.current.value
        if(name === '') return
        setQuestions(prevQuestions => {
            return [...prevQuestions, {id:1, name:name, complete:false}]
        })
    }

    return(
        <>
            <div className="header">
                <h2>Create a Survey</h2>
            </div>

            <div className='createSurvey'>
                <label style={{fontSize:12}}>Question
                    <input ref={questionNameRef} type="text" style={{margin:10}}/>
                </label>
                <label style={{fontSize:12}}>Multiple choice
                    <input type="radio" style={{margin:10}} />
                </label>
                <label style={{fontSize:12}}>T/F
                    <input type="radio" style={{margin:10}} />
                </label>
                <label style={{fontSize:12}}>Text
                    <input type="radio" style={{margin:10}} />
                </label>
                <label style={{fontSize:12}}>Slider
                    <input type="radio" style={{margin:10}} />
                </label>

                <button onClick={handleAddQuestion}>Add Question</button>
                <button>Remove Question</button>
                <QuestionList questions={questions}/>
            </div>
        </>
    )
}
// a={todos} - here a can be a variable and it's a way to call the list to render the list from useState([])