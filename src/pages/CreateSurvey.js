import React, {useState, useRef, useEffect} from 'react';
import QuestionList from './QuestionList';
import uuidv4 from 'uuid/v4';


const LOCAL_STORAGE_KEY = 'ultimate.questions'

export default function MainContent(){

    const [questions,setQuestions] = useState([{id:1, name:'question', complete:false}])
    // const [todos,setTodos] = useState(['question 1','question 2']) -> this was the earlier version
    // the first argument is the state, and the second is the function we will call on that state
    // so the first will be the questions and the second will be the function which we can call to do something with the questions

    useEffect(() => {
        const storedQuestions = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedQuestions) setQuestions(storedQuestions)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(questions))
    }, [questions])

    const questionNameRef = useRef()
    function handleAddQuestion(e){
        const name = questionNameRef.current.value
        if(name === '') return
        setQuestions(prevQuestions => {
            return [...prevQuestions, {id:uuidv4(), name:name, complete:false}]
        })
    }
    function toggleQuestion(id) {
        const newQuestions = [...questions]
        const question = newQuestions.find(question => question.id === id)
        question.complete = !question.complete
        setQuestions(newQuestions)
    }

    function handleClearQuestions() {
        const newQuestions = questions.filter(question => !question.complete)
        setQuestions(newQuestions)
    }

    return(
        <>
            <div className='createSurvey'>
                <label style={{fontSize:17}}>Question
                    <input ref={questionNameRef} type="text" style={{margin:10}}/>
                </label>
                <label style={{fontSize:17}}>Multiple choice
                    <input type="radio" style={{margin:10}} />
                </label>
                <label style={{fontSize:17}}>True/False
                    <input type="radio" style={{margin:10}} />
                </label>
                <label style={{fontSize:17}}>Text
                    <input type="radio" style={{margin:10}} />
                </label>
                <label style={{fontSize:17}}>Slidersssss
                    <input type="radio" style={{margin:10}} />
                </label>

                <button onClick={handleAddQuestion}>Add Question</button>
                <button onClick={handleClearQuestions}>Remove Selected Question</button>
                <QuestionList questions={questions} toggleQuestion={toggleQuestion}/>
            </div>
        </>
    )
}
// a={todos} - here a can be a variable and it's a way to call the list to render the list from useState([])