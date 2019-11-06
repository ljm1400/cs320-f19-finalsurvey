import React, { Component } from 'react';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import { ExpansionPanel } from '@material-ui/core';

import '../css/style.css';

class YourSurveys extends Component {
  render() {
    return (
        <>
        <div className="header">
            <h2>Your Surveys</h2>
            <p className="surveyResults">Survey 1</p>
            {/* <ExpansionPanel TransitionProps={{ unmountOnExit: true }} /> */}
        </div> 
        </>
    );
  }
}
export default YourSurveys;