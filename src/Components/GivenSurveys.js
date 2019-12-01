import React, { Component } from 'react';
import '../css/style.css';
import axios from 'axios';
import Collapsible from './Collapsible';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as utils from './Utils.js'


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

    opensurveyIdList.forEach(function (survey) {
      requests.push(
        axios.get('http://localhost:5000/surveys/' + survey)
          .then(survey => {
            openSurveyDataList.push(survey.data)
          })
          .catch(function (error) {
            console.log("Could not get survey: " + error)
          })
      )
    })

    // Need to use Promise.all() to make sure setState will update the surveyDataList after all requests finished
    Promise.all(requests).then((val) => {
      this.setState({ openSurveyDataList: openSurveyDataList })
    })
  }

  randerTableHeader() {
    let header = ["#", "Questions", "Category", "Answers"]
    return header.map((key, index) => {
      return <th key={index}>{key}</th>
    })
  }

  randerTableItems(questions) {
    return questions.map((sur, index) => {
      // temporarily hardcode survey answers
      return (
        <tr>
          <td>{sur.num}</td>
          <td>{sur.name}</td>
          <td>{sur.category}</td>
          <td>Ans{sur.num}</td>
        </tr>
      )
    })
  }

  render() {
    if (this.props.auth.isAuthenticated && this.state.gotSurveyData == false) {
      this.getOpenSurveys(this.props.auth.user.openSurveys)
      this.setState({ gotSurveyData: true });
    }

    return (
      <div className="header">
        <h2>Open Surveys</h2>
        <div>
          {this.state.openSurveyDataList.map((survey) => {
            return <>
              <Collapsible
                title={'Survey Title: ' + survey.title_survey}
                issueDate={'Issue Date: ' + utils.formatDate(new Date(survey.issued_date))}
                closingDate={'Closing Date: ' + utils.formatDate(new Date(survey.close_date))}>
                <h3>Questions</h3>
                <table id='surveys'>
                  <tbody>
                    <tr>{this.randerTableHeader()}</tr>
                    {this.randerTableItems(survey.questions)}
                  </tbody>
                </table>
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