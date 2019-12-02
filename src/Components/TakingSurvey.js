import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import '../css/style.css';
import Answer from './Answer';
import { Button, Form, FormGroup } from 'reactstrap';
import * as Utils from './Utils.js'
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';


//Notes for formatting of submitted answers:
//answers for each user are stored in an array
//The first array index is the user's mongo ID
//the rest of the indexes represent each answer, where the answer is at the index of the question's index + 1

class TakingSurvey extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
      let survey = this.props.location.state.survey
      let formatted_Close_Date = Utils.formatDate(new Date(survey.close_date))
      let formatted_Issue_Date = Utils.formatDate(new Date(survey.issued_date))

      this.state = {
        survey: survey,
        close_date: formatted_Close_Date,
        issued_date: formatted_Issue_Date,
        surveyAnswers: null,
        redirect: false,
        user: null
      }  
  }

  setUser (){
    
    this.setState({
      surveyAnswers: [this.state.user._id]
    })
  }

  initUser(){
    this.setState({
      user: this.props.auth.user
    })
  }
  
  changeAnswers(answers, index) {
    let answerList = this.state.surveyAnswers
    answerList[index+1] = answers
    this.setState({
      surveyAnswers: answerList
    })
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if(this.state.redirect)
      return <Redirect to={
        {
          pathname: '/YourSurveys'    
        }} />
    }
  

  handleSubmitButton= e => {
    e.preventDefault();
    let answers = this.state.surveyAnswers
    alert('You have submitted your survey. Thank you!');
    //do the axios posting here
    axios.post("http://localhost:5000/surveys/addAnswers/" + this.state.survey._id, {answers})
    .then(console.log(res => console.log("Update Survey Answers data: " + res)))
    this.setRedirect();
  }

  //currently this is the only way I could get the user to store any user data
  render() {
    if(this.props.auth.isAuthenticated && this.state.user === null){
      this.initUser()

    }
    if(this.state.user && this.state.surveyAnswers === null){
      this.setUser()
    }
    return (
        <div className="header">
            {this.renderRedirect()}
            <h2>{"Taking Survey: " + this.state.survey.title_survey}</h2>
            <h3>{"Issue Date: " + this.state.issued_date}</h3>
            <h3>{"Close Date: " + this.state.close_date}</h3>
            
            <form className="surveyQuestions" onSubmit={this.handleSubmitButton}>
              {this.state.survey.questions.map((questionObj, index) => {
                return <Answer index = {index} questionObj={questionObj} changeAnswers ={this.changeAnswers.bind(this)}> </Answer>        
              })}
              <Button type = "submit" color="success">Submit Survey</Button>{' '}
              {/* don't need onClick for button, since form is handling the onSubmit */}
            </form>
        </div> 
    );
    
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(TakingSurvey);