import React, { Component } from 'react';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import { ExpansionPanel } from '@material-ui/core';

import '../css/style.css';

export default class Analytics extends Component {
  render() {
    return (
        <>
        <div className="header">
            <h2>Analytics</h2>
            <p className="surveyResults">Results Summary</p>
            <p className="surveyResults">Survey 1</p>
            {/* <ExpansionPanel TransitionProps={{ unmountOnExit: true }} /> */}
        </div> 
        </>
    );
  }
}