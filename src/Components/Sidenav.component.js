import React, { Component } from 'react';
import {NavItem} from 'reactstrap';
import PropTypes from 'prop-types';
import '../css/style.css';
import profile_pic from '../res/img_profile_pic.png';
import { connect } from 'react-redux';
import './CreateSurvey.js';
import './GivenSurveys.js';
import Logout from './logout';
import { Redirect } from 'react-router'

class Sidenav extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  renderRedirect = () => {
    return <Redirect to='/YourSurveys' />
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    if(isAuthenticated){
      var isManager = user.positionTitle.includes("Manager") || user.positionTitle.includes("CEO");
    }
    
    return (
        <div className="sidenav">
            <img src={profile_pic} alt="profile_pic"></img>
            <p><strong>{user ? `${user.firstName}` : ''}</strong></p>
            <p>{isManager?'Manager' : 'Employee'}</p>
            <NavItem>
            <Logout />
            </NavItem>
            <div className="links">
              <a href="/YourSurveys">Your Surveys</a>
              {isManager ? <a href="/CreateSurvey">Create Survey</a> : null}
              {isManager ?<a href="/GivenSurveys">Given Surveys</a> : null}
              {isManager ?<a href="/Analytics">Analytics</a> : null}
            </div>             
        </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Sidenav);