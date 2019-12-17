import React, { useState, useRef, useEffect, Redirect } from 'react';
import QuestionList from './QuestionList';
import uuidv4 from 'uuid/v4';
import '../css/style.css';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'reactstrap';


const LOCAL_STORAGE_KEY = 'ultimate.questions'

function CreateSurvey(props) {
    var state = {
        title_survey: "",
        questions: [],
        issued_date: new Date(),
        close_date: "",
        issued_by: "",
    }
    
    const [questionNum, setQuestionNum] = useState(1);
    const [close_date, setCloseDate] = useState(new Date());
    const [release_date, setReleaseDate] = useState(new Date());

    const [questions, setQuestions] = useState([{}])
    const [radio, setRadio] = useState("t");

    const surveyTitle = useRef()
    const questionNameRef = useRef()
    const categoryRef = useRef()
    const typeRef = useRef()
    var Options = []

    var propTypes = {
        auth: PropTypes.object.isRequired
    };
    const { isAuthenticated, user } = props.auth;

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


    function handleAddQuestion(e)  {
        const quesNum = questionNum
        const name = questionNameRef.current.value
        const type = typeRef.current.value
        const options = Options
        const category = categoryRef.current.value

        if (name === '') return
        setQuestionNum(quesNum + 1)

        setQuestions(prevQuestions => {
            let obj = {
                id: uuidv4(), 
                num: quesNum,
                name: name,
                type: type,
                options: options,
                category: category,
                complete: false
            }
            console.log(obj);
            prevQuestions.push(obj);
            return prevQuestions
        })
        
        document.getElementById('ques').value = '';
    }

    function toggleQuestion(id, action) {
        const newQuestions = [...questions]
        const question = newQuestions.find(question => question.id === id)
        question.complete = !question.complete
        setQuestions(newQuestions)

        if (action === 'remove') {
            const newQuestions = questions.filter(question => !question.complete)
            setQuestions(newQuestions)
        }
    }

    function getOptions(options) {
        Options = options
    }

    function handleSubmit() {
        if (questions.length === 0) {
            console.info("Please add 1 question")
            return false;
        }
        alert('You have submitted the survey');
 

        // set the state's values
        state.title_survey = surveyTitle.current.value;
        state.questions = questions;
        state.issued_by = user.employeeId
        state.close_date = close_date;

        axios.post("http://localhost:5000/surveys/add", state)
            .then(res =>
                updateManagerOpenList(res.data._id)
            )

        questions.map(q => q.complete = true)
    }


    function updateManagerOpenList(newSurveyId) {
        let surveyIdList = user.openSurveys;
        if (surveyIdList.length === 0 || surveyIdList === undefined) {
            surveyIdList = []
        }
        surveyIdList.push(newSurveyId)
        user.openSurveys = surveyIdList

        const { employeeId, companyId } = user
        axios.post('http://localhost:5000/users/update/', user, { params: { employeeId, companyId } })
            .then(res => console.log("Updated Manager Open Surveys Response: " + res.data))
    }

    function handleRadio(e) {
        let value = e.target.value
        setRadio(value)
    }
    function handleCloseDate(date) {
        setCloseDate(date);
    }
    function handleReleaseDate(date) {
        setReleaseDate(date);
    }

    return (
        <div className='createSurvey'>
            <h2>Create a Survey</h2>
            <form onSubmit={handleSubmit}>
                <label style={{ fontSize: 20 }}>Survey Title
                        <input ref={surveyTitle} type="text" style={{ margin: 10, fontSize: 20 }} required />
                </label>

                <br></br>
                <label style={{ fontSize: 20, margin:10 }}>Closing Date
                        <DatePicker className="closingDate" selected={close_date} onChange={handleCloseDate}></DatePicker>
                </label>
                <label style={{ fontSize: 20, margin:10 }}>Release date
                        <DatePicker selected={release_date} onChange={handleReleaseDate}></DatePicker>
                </label>

                <br></br>
                <label style={{ fontSize: 20 }}>Question
                        <textarea rows="2" cols="40" id="ques" ref={questionNameRef} style={{ margin: 10, fontSize: 20 }} />               
                </label>

                <br></br>
                <label style={{ fontSize: 20 }}>Category
                        <input ref={categoryRef} placeholder="N/A" type="text" style={{ margin: 10, fontSize: 20 }} />
                </label>

                <br></br>
                <label style={{ fontSize: 20, margin:10 }}>Type:  
                    <select name="questionType" ref={typeRef} style={{margin:10}}>
                        <option value="True False">True / False</option>
                        <option value="Multiple Choice">Multiple Choice</option>
                        <option value="Text">Text</option>
                        <option value="Slider">Slider</option>
                    </select>
                </label>

                <br></br>

                <button type="button" style={{ fontSize: 20, margin: 10, backgroundColor: 'white' }} onClick={handleAddQuestion}>Add Question</button>
                <br></br>
                <QuestionList questions={questions} toggleQuestion={toggleQuestion} radio={radio} getOptions = {getOptions} />
                <br></br>
                <input type="submit" value="Submit Survey"></input>
            </form>
        </div>
    )
}
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    null
)(CreateSurvey);
// a={todos} - here a can be a variable and it's a way to call the list to render the list from useState([])