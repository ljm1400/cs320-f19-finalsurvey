import React, { Component } from 'react';
import '../css/style.css';
import profile_pic from '../res/img_profile_pic.png';

class CreateSurvey extends Component {
  render() {
    return (
        <>
            <div className="sidenav">
                    <img src={profile_pic} alt="profile_pic"></img>
                    <p>John Smith</p>
                    <p>Manager</p>
                    <hr></hr>
                    <a href="/home">Home</a>
                    <a href="/createSurvey">Create Survey</a>
                    <a href="/givenSurveys">Given Surveys</a>  
            </div>
            
            <div className="main">
                <h2>Create a Survey</h2>

            </div>
        </>
    );
  }
}
export default CreateSurvey;