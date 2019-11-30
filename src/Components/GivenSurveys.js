import React, { Component } from 'react';
import '../css/style.css';
import axios from 'axios';
import Collapsible from './Collapsible';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class GivenSurveys extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      surveys: [],
      gotSurveyData: false,
      openSurveyDataList: [],
      closedSurveyDataList: []
    };
  }

  getOpenSurveys = (surveyList) => {  
      let opensurveyIdList = surveyList
      let openSurveyDataList = []
      let requests = []

      opensurveyIdList.forEach(function(survey) {
          requests.push(
            axios.get('http://localhost:5000/surveys/'+ survey)
          .then(survey => {
            openSurveyDataList.push(survey.data)
          })
      )})

      // Need to use Promise.all() to make sure setState will update the surveyDataList after all requests finished
      Promise.all(requests).then((val) => {
        this.setState({openSurveyDataList: openSurveyDataList})
      })
   }


  render() {
    if (this.props.auth.isAuthenticated && this.state.gotSurveyData == false){
      this.getOpenSurveys(this.props.auth.user.openSurveys)
      this.setState({gotSurveyData: true});
    }
    
   function formatDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = (month.length) > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = (day.length) > 1 ? day : '0' + day;
    
    return month + '/' + day + '/' + year;
  }
    return (
        <div className="header">
            <h2>Open Surveys</h2>
            <div>
              {this.state.openSurveyDataList.map((survey) => {
                   return <>
                      <Collapsible 
                      title={'Survey Title: ' + survey.title_survey} 
                      issueDate={'Issue Date: ' + formatDate(new Date(survey.issued_date))}
                      closingDate={'Closing Date: ' + formatDate(new Date(survey.close_date))}>
                          <h3>Questions</h3>
                          <div className="surveyQuestions">
                              {survey.questions.map((questionObj, index) => {
                                return <p>{questionObj.num}) {questionObj.name + ' (Category:'+questionObj.category + ')'}</p>              
                              })}
                          </div>
                          <h3>Answers</h3>
                          <p>1) Very satisfied, Not Satisfied, Not Satisfied, Ok</p>
                          <p>2) Ok</p>
                          <h3>Analytics</h3>
                          <p>Project 1 Label: Employees satisfied</p>
                          <p>Project 2 Label: Employees not satisfied</p>
                      </Collapsible>    
                    </>          
              })}
            </div>
            <h2>Closed Surveys</h2>
        </div> 
      
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  null
)(GivenSurveys);