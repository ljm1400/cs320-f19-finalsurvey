import React, { Component } from 'react';
import '../css/style.css';
import Answer from './Answer';
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
          surveyAnswers: []
      }
  }
  changeAnswers(answers) {
    this.setState({
      surveyAnswers: answers
    })
  }

  render() {
    function handleSubmit() {
      alert('You have submitted your survey. Thank you!');
    }

    return (
        <div className="header">
            <h2>{"Taking Survey: " + this.state.survey.title_survey}</h2>
            <h3>{"Issue Date: " + this.state.issued_date}</h3>
            <h3>{"Closing Date: " + this.state.close_date}</h3>

            <form className="surveyQuestions" onSubmit={handleSubmit}>
              {this.state.survey.questions.map((questionObj, index) => {
                return <Answer questionObj={questionObj} changeAnswers={this.changeAnswers.bind(this)}></Answer>     
              })}
                <input type="submit" value="Submit Survey"></input>
            </form>
        </div> 
    );
  }
}
