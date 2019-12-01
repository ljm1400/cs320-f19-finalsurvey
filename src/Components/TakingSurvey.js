import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import '../css/style.css';
import Answer from './Answer';
import { Button, Form, FormGroup } from 'reactstrap';
import * as Utils from './Utils.js'

export default class TakingSurvey extends Component {
  constructor(props) {
    super(props);

    let survey = this.props.location.state.survey
    let formatted_Close_Date = Utils.formatDate(new Date(survey.close_date))
    let formatted_Issue_Date = Utils.formatDate(new Date(survey.issued_date))

    this.state = {
      survey: survey,
      close_date: formatted_Close_Date,
      issued_date: formatted_Issue_Date,
      surveyAnswers: [],
      redirect: false
    }      
  }
  
  changeAnswers(answers) {
    this.setState({
      surveyAnswers: answers
    })
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={
        {
          pathname: '/YourSurveys'    
        }} />
    }
  }

  handleSubmitButton() {
    this.setRedirect();
    alert('You have submitted your survey. Thank you!');
  }

  render() {
    return (
        <div className="header">
          {this.renderRedirect()}
            <h2>{"Taking Survey: " + this.state.survey.title_survey}</h2>
            <h3>{"Issue Date: " + this.state.issued_date}</h3>
            <h3>{"Close Date: " + this.state.close_date}</h3>
            
            <form className="surveyQuestions" onSubmit={this.handleSubmitButton}>
              {this.state.survey.questions.map((questionObj, index) => {
                return <Answer questionObj={questionObj}></Answer>        
              })}
              <Button color="success">Submit Survey</Button>{' '}
              {/* don't need onClick for button, since form is handling the onSubmit */}
            </form>
        </div> 
    );
  }
}
