import React, { Component } from 'react';
import '../css/style.css';


class Manager_Home extends Component {
  render() {
    return (
        <>
        <div className="sidenav">
            <img src="../res/img_profile_pic.png" alt="Avatar"></img>
            <p>John Smith</p>
            <p>Manager</p>
            <hr></hr>
            <a href="/home">Home</a>
            <a href="/createSurvey">Create Survey</a>
            <a href="/givenSurveys">Given Surveys</a>  
        </div>
    
        <div id="main">
            <h2>Your Surveys</h2>
            <p class="borders">Survey 1</p>
            <p class="borders">Survey 2</p>
            <p class="borders">Survey 3</p>
            <p class="borders">Survey 4</p>
            <p class="borders">Survey 5</p>
        </div>
      </>
    );
  }
}
export default Manager_Home;