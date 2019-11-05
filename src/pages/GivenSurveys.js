import React, { Component } from 'react';
import '../css/style.css';
import axios from 'axios'


class GivenSurvey extends Component {
  render() {
    return (
        <>
        <div className="header">
            <h2>Given Surveys</h2>
            <p className="surveyResults">Survey 1</p>
        </div> 
        </>
    );
  }
}
export default GivenSurvey;