import React, {useState, useRef, useEffect} from 'react';
import QuestionList from './QuestionList';
import uuidv4 from 'uuid/v4';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const LOCAL_STORAGE_KEY = 'ultimate.questions'

function CreateSurvey(props){
    var state = {
        survey_id: 0,
        title_survey: "",
        questions: [],
        issue_date: new Date(),
        close_date: "",
        issued_by: "",
    }
    const [close_date, setCloseDate] = useState(new Date());
    const [questions,setQuestions] = useState([{id:1, name:'question', complete:false}])
    const [radio, setRadio] = useState(0);
    const surveyTitle = useRef()
    const questionNameRef = useRef()

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
        const name = questionNameRef.current.value
        console.log(user.employeeId)

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

    function getUniqueSurveyId(surveyList) {
        if(surveyList.length == 0) return 1
        let lastNum = surveyList.length;
        return lastNum + 1;
    }

    function c(){
        alert('You have submitted the survey');
        
        let questionList = [];
        Object.keys(questions).forEach(function(key) {
            questionList.push(questions[key].name);
        })

     
        //  let newSurveyId = getUniqueSurveyId(surveyIdList);
        //  surveyIdList.push(newSurveyId);
        //  console.log("new survey id" + newSurveyId)
  
        // set the state's values
        state.title_survey = surveyTitle.current.value;
        state.questions = questionList;
        state.issued_by = user.employeeId
        state.close_date = close_date;
        console.log(state);

        axios.post("http://localhost:5000/surveys/add", state)
        .then(res => 
            updateManagerOpenList(res.data._id)
        )
             
        questions.map(q => q.complete = true)
        handleClearQuestions();
    }

    function updateManagerOpenList(newSurveyId) {
        // Get manager's list of open surveys to create a new unique survey ID
        const {managerId, companyId} = user
        let surveyIdList =[]
        axios.get('http://localhost:5000/users/getUser/', {params:{employeeId: managerId, companyId}})
        .then(user => {
            if(user.openSurveys != null)
                surveyIdList = user.openSurveys;
        })

        console.log(newSurveyId);
        surveyIdList.push(newSurveyId)
        user.openSurveys = surveyIdList

        axios.post('http://localhost:5000/users/update/'+ user.employeeId, user)
        .then(res => console.log(res.data))
    }

    function handleRadio(e){
        setRadio(e.target.value)
    }
    function handleCloseDate(date) {
        setCloseDate(date);
        console.log(date);
    }
    
    return(
            <div className='createSurvey'>
                <h2>Create a Survey</h2>
                <label style={{fontSize:20}}>Survey Title
                    <input ref={surveyTitle} type="text" style={{margin:10, fontSize:20}}/>
                    <br></br>
                </label>
                <label style={{fontSize:20}}>Closing Date 
                    <DatePicker selected={close_date} onChange={handleCloseDate}></DatePicker>
                </label>
               
                <label style={{fontSize:20}}>Question
                    <input ref={questionNameRef} type="text" style={{margin:10, fontSize:20}}/>
                </label>

                <form>
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
                </form>
                <button style={{fontSize:20, margin:10, backgroundColor:'white'}} onClick={handleAddQuestion}>Add Question</button>
                <button style={{fontSize:20}} onClick={handleClearQuestions}>Remove Question</button>
                <QuestionList questions={questions} toggleQuestion={toggleQuestion} radio={radio}/>
                <button style={{fontSize:20}} onClick={c}>Submit Survey</button>
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