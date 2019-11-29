import React, { Component } from 'react';
import '../css/style.css';

export default class TakingSurvey extends Component {
  constructor(props) {
      super(props);
      let survey = this.props.location.state.survey
      let formatted_Close_Date = this.formatDate(new Date(survey.close_date))
      let formatted_Issue_Date = this.formatDate(new Date(survey.issued_date))
      
      this.state = {
          survey: survey,
          close_date: formatted_Close_Date,
          issued_date: formatted_Issue_Date
      }
  }

   formatDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = (month.length) > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = (day.length) > 1 ? day : '0' + day;
    
    return month + '/' + day + '/' + year;
  }

  render() {
    return (
        <div className="header">
            <h2>{"Taking Survey: " + this.state.survey.title_survey}</h2>
            <h3>{"Issued Date: " + this.state.issued_date}</h3>
            <h3>{"Closing Date: " + this.state.close_date}</h3>
            <div className="surveyQuestions">
              {this.state.survey.questions.map((question, index) => {
                return <p>{index+1}) {question}</p>              
              })}
            </div>
        </div> 
    );
  }
}
