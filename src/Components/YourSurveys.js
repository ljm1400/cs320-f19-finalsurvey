import React, { Component} from 'react';
import { Redirect } from 'react-router-dom'
import {ListGroupItem} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSurveys, deleteSurvey } from '../actions/surveyActions';

import '../css/style.css';

class YourSurveys extends Component {

  static propTypes = {
    getSurveys: PropTypes.func.isRequired,
    survey: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
    redirect: PropTypes.bool
  };
  state ={
    redirect: false,
    survey: this.props.survey
  }

  componentDidMount() {
    this.props.getSurveys();
  }
  setRedirect = () => {
    this.setState({
      redirect: true
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
  
 
  render() {
    const {_id, surveys } = this.props.survey;
    return (
        <div className="header">
          <h2>Your Surveys</h2>
            {this.renderRedirect()}
          {surveys.map(({_id, title_survey }) => (
                  <button key={_id}onClick={this.setRedirect} className="surveyResults" > {title_survey} </button>
            ))}
            
            
        </div> 
    );
  }
}
const mapStateToProps = state => ({
  survey: state.survey,
  isAuthenticated: state.auth.isAuthenticated,
  redirect: state.redirect
});

export default connect(
  mapStateToProps,
  { getSurveys, deleteSurvey }
)(YourSurveys);
