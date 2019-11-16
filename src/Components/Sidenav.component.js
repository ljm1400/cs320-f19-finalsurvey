import React, { Component } from 'react';
import '../css/style.css';
import profile_pic from '../res/img_profile_pic.png';
import './CreateSurvey.js';
import './GivenSurveys.js';

class Sidenav extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className="sidenav">
            <img src={profile_pic} alt="profile_pic"></img>
            <p>John Smith</p>
            <p>{this.props.isManager?'Manager' : 'Employee'}</p>
      
            <div className="links">
              <a href="/Home">Your Surveys</a>
              {this.props.isManager ? <a href="/CreateSurvey">Create Survey</a> : null}
              {this.props.isManager ?<a href="/GivenSurveys">Given Surveys</a> : null}
              {this.props.isManager ?<a href="/Analytics">Analytics</a> : null}
            </div>             
        </div>
    );
  }
}
export default Sidenav;