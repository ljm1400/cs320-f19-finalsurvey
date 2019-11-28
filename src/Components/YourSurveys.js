import React, { Component} from 'react';
import { Redirect } from 'react-router-dom'
import {ListGroupItem} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {loadSurveys } from '../actions/surveyActions';

import '../css/style.css';
import login from './login';

class YourSurveys extends Component {
  constructor(props) {
    super(props);
    this.state ={
      redirect: false,
      taking: null,
      surveys: [],
      manager: null
    }
  }
  static propTypes = {
    auth: PropTypes.object.isRequired,
    redirect: PropTypes.bool
  };

  componentDidMount() {
    axios.get('http://localhost:5000/surveys/')
      .then(response => {
        if(response.data.length > 0) {
          this.setState({
            surveys: response.data
          })
        }
        console.log(this.state.surveys);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  setRedirect = ({id}) => {
    this.setState({
      redirect: true,
      taking: id
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={
          {
            pathname: '/TakingSurvey',
            state: {surveyID: 1}    
          }} />
    }
  }
  getManager = (user) => {
  const {managerId, companyId} = user
    axios.get('http://localhost:5000/users/getUser/', {params:{employeeId: managerId, companyId}})
    .then(user => {
      this.setState({manager: user.data})
    })
  }

  render() {
    const{isAuthenticated, user} = this.props.auth;
    const {manager} = this.state
    
    if(isAuthenticated){
      if(manager === null){
        this.getManager(user)
      }
      if(user.positionTitle.includes("CEO")){
        return (
        <div className="header">
        <h1>Your Surveys</h1>
        <h2> You have no surveys, you are the CEO!!!</h2>
        <h3> Consider Creating a survey!</h3>
        </div> 
        );
      }
      var surveys = null
      if(!surveys){
        return <div className="header">
        <h2>You have no open surveys</h2>
        <big>{manager ? "Your manager's name is: " + `${manager.firstName}`:''}</big>
        </div>
      }
    }
    return (
        <div className="header">
        <h2>Your Surveys</h2>
        {this.renderRedirect()}
        {isAuthenticated ?
          
          surveys.map(({_id, title_survey }) => (
                  <button key={_id}onClick={this.setRedirect} className="surveyResults" > {title_survey} </button>
            )) :null }
        
            
            
        </div> 
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  redirect: state.redirect
});

export default connect(
  mapStateToProps,
  null
)(YourSurveys);
