import React, { Component } from 'react';
import '../css/style.css';
import profile_pic from '../res/img_profile_pic.png';
import { BrowserRouter } from 'react-router-dom';
import CreateSurvey from './CreateSurvey.js'
import {Link} from 'react-router-dom';

class Manager_Home extends Component {
  render() {
    return (
        <>
            <div className="sidenav">
                    <img src={profile_pic} alt="profile_pic"></img>
                    <p>John Smith</p>
                    <p>Manager</p>
                    <hr></hr>
          
                    <div className="links">
                    <a href="/Home">Home</a>
                    <a href="/CreateSurvey">Create Survey</a>
                    <a href="/GivenSurveys">Given Surveys</a>  
                    </div>             
            </div>
            
            <div className="main">
                <h2>Your Surveys</h2>
                <p className="borders">Survey 1</p>
            </div>
        </>
    );
  }
}
export default Manager_Home;