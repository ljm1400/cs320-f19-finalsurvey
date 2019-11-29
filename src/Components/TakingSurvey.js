import React, { Component } from 'react';
import '../css/style.css';

export default class TakingSurvey extends Component {
  constructor(props) {
      super(props);
      let survey = this.props.location.state.survey
      let formattedDate = this.formatDate(new Date(survey.close_date))
      this.state = {
          survey: survey,
          date: formattedDate
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
            <h2>{"Closing Date: " + this.state.date}</h2>
            <div className="surveyQuestions">
              {this.state.survey.questions.map((question, index) => {
                return <p>{index+1}) {question}</p>              
              })}
            </div>
        </div> 
    );
  }
}
