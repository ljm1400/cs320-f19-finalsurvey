import React, {useState} from 'react';
import QuestionList from './QuestionList';

export default function MainContent(){

    const [todos,setTodos] = useState([])
    // the first argument is the state, and the second is the function we will call on that state
    // so the first will be the questions and the second will be the function which we can call to do something with the questions
    return(
        <>
            <div className='main'>
                <QuestionList></QuestionList>
                <input type="text"/>
                <button>Add Question</button>
                <button>Remove Question</button>
            </div>
        </>
    )
}