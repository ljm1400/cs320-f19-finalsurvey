import React, {useState, useRef, useEffect, Redirect} from 'react';
import QuestionList from './QuestionList';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

    const [questions,setQuestions] = useState([{}])
    const [radio, setRadio] = useState("t");

    const surveyTitle = useRef()
    const questionNameRef = useRef()
    const categoryRef = useRef()

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


    function handleAddQuestion(e){
        const quesNum = questionNum
        const name = questionNameRef.current.value
        const type = radio
        const options = ["satisfied", "not satisfied"]
        const category = categoryRef.current.value

        if(name === '') return
        setQuestionNum(quesNum + 1)

        setQuestions(prevQuestions => {            
            let obj = {id:uuidv4(), num: quesNum, name:name, type: type, 
                options:options, category:category, complete:false}
            prevQuestions.push(obj);
            return prevQuestions
        })
        console.log(questions)
        document.getElementById('ques').value='';
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

    function handleSubmit(){
        alert('You have submitted the survey');
        if(questions.length == 0) {
            console.info("Please add 1 question")
            return false;
        }
        // let questionList = [];
        // Object.keys(questions).forEach(function(key) {
        //     console.log(questions[key])
        //     questionList.push(questions[key]);
        // })
  
        // set the state's values
        state.title_survey = surveyTitle.current.value;
        state.questions = questions;
        state.issued_by = user.employeeId
        state.close_date = close_date;
        console.log('FINAL STATE')
        console.log(state);

        axios.post("http://localhost:5000/surveys/add", state)
        .then(res => 
            updateManagerOpenList(res.data._id)
        )
             
        questions.map(q => q.complete = true)
        handleClearQuestions();
    }


    function updateManagerOpenList(newSurveyId) {
        let surveyIdList = user.openSurveys;
        if(surveyIdList.length == 0){surveyIdList = []}
        surveyIdList.push(newSurveyId)
        user.openSurveys = surveyIdList

        const {employeeId, companyId} = user
        axios.post('http://localhost:5000/users/update/', user, {params:{employeeId: employeeId, companyId}})
            .then(res => console.log("Updated Manager Open Surveys Response: " + res.data))
    }

    function handleRadio(e){
        let value = e.target.value
        setRadio(value)
        if(value == "m") {
            
        }

    }
    function handleCloseDate(date) {
        setCloseDate(date);
    }
    function handleReleaseDate(date) {
        setReleaseDate(date);
    }
    
    return(
            <div className='createSurvey'>
                <h2>Create a Survey</h2>
                <form onSubmit={handleSubmit}>
                    <label style={{fontSize:20}}>Survey Title
                        <input ref={surveyTitle} type="text" style={{margin:10, fontSize:20}} required/>
                    </label>
                    
                    <br></br>
                    <label style={{fontSize:20}}>Closing Date 
                        <DatePicker className="closingDate" selected={close_date} onChange={handleCloseDate}></DatePicker>
                    </label>
                    <label style={{fontSize:20}}>Release date 
                        <DatePicker selected={release_date} onChange={handleReleaseDate}></DatePicker>
                    </label>
    
                    <br></br>
                    <label style={{fontSize:20}}>Question
                        <input id= "ques" ref={questionNameRef} type="text" style={{margin:10, fontSize:20}}/>
                    </label>
                    <label style={{fontSize:20}}>Category
                        <input ref={categoryRef} type="text" style={{margin:10, fontSize:20}}/>
                    </label>

                        <label style={{fontSize:20}}>Multiple choice
                            <input type="radio" value="m" onChange={handleRadio} checked={radio === 'm'} style={{margin:10}} />
                        </label>
                        <label style={{fontSize:20}}>True/False
                            <input type="radio" value="tr" onChange={handleRadio} checked={radio === 'tr'} style={{margin:10}} />
                        </label>
                        <label style={{fontSize:20}}>Text
                            <input type="radio" value="t" onChange={handleRadio} checked={radio === 't'} style={{margin:10, fontSize:20}} />
                        </label>
                        <label style={{fontSize:20}}>Slider
                            <input type="radio" value="s" onChange={handleRadio} checked={radio === 's'} style={{margin:10}} />
                        </label>
                        
                        <br></br>                        
                        <button type="button" style={{fontSize:20, margin:10, backgroundColor:'white'}} onClick={handleAddQuestion}>Add Question</button>
                        <button type="button" style={{fontSize:20}} onClick={handleClearQuestions}>Remove Question</button>
                        <br></br>

                        <QuestionList questions={questions} toggleQuestion={toggleQuestion} radio={radio}/>
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