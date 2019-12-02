import React, { Component } from 'react';
import {NavItem} from 'reactstrap';
import PropTypes from 'prop-types';
import '../css/style.css';
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
      <>
        <div className="sidenav">            
            <p><strong>{user ? `${user.firstName}` : ''}</strong></p>
            <p> {user ? `${user.companyName}`: ''}</p>
            <p>{isManager?'Manager' : 'Employee'}</p>
            <NavItem>
              <Logout />
            </NavItem>
            <div className="links">
              <a href="/YourSurveys">Your Surveys</a>
              {isManager ? <a href="/CreateSurvey">Create Survey</a> : null}
              {isManager ?<a href="/GivenSurveys">Given Surveys</a> : null}
              
            </div>             
        </div>
        </>
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

// if we decide to add a separate analytics page later, we will need {isManager ?<a href="/Analytics">Analytics</a> : null} 