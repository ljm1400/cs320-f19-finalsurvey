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
  getClosedSurveyData = (closedSurveyList) => {
      let surveyDataList = []
      let requests = []

      closedSurveyList.forEach(function(survey) {
          requests.push(
            axios.get('http://localhost:5000/surveys/'+ survey)
          .then(survey => {
            surveyDataList.push(survey.data)
          }).catch(function (error) {
            console.log('Failed to get survey' + error);
          })
      )})

       // Need to use Promise.all() to make sure setState will update the surveyDataList AFTER all requests finished
      Promise.all(requests).then((val) => {
        this.setState({closedSurveyDataList: surveyDataList})
      })
  }

  randerTableHeader(header) {
    return header.map((key, index) => {
      return <th key={index}>{key}</th>
    })
  }

  formatAnswers(answers, num){
    return answers.map((ans, index) => {
      let person = ans
      return person.map((answer, ind) =>{
        if(ind == num) {
          let personNum = index + 1
          return <p>{'Person ' + personNum +') '+answer}</p>
        }
      })
    })
  }

  randerTableItems(survey) {
    return survey.questions.map((sur, index) => {
      return (
        <tr>
          <td>{sur.num}</td>
          <td>{sur.name}</td>
          <td>{sur.type}</td>
          <td>{sur.category}</td>
          <td>{survey.answers ? this.formatAnswers(survey.answers, index + 1) : ""}</td>
        </tr>
      )
    })
  }

  renderTrueFalseTableItems(survey) {
      console.log(survey.questions)
      console.log("------")
      let tfQuestionArr = survey.questions.filter(ques => 
        ques.category == "True False"
      )
     
      console.log(tfQuestionArr)

      tfQuestionArr.map((ques, index) => {
        let quesNum = ques.num
        console.log(ques.num)
        console.log('---')
        let totalAnswers = survey.answers.length
        let numTrue = 0
        survey.answers.map((ansArr, idx) => {
            if(ansArr[quesNum] == "True") numTrue++
        })
        let numFalse = totalAnswers - numTrue

        return (
          <tr>
            <td>{ques.name}</td>
            <td>{numTrue}</td>
            <td>{numFalse}</td>
          </tr>
        )
      })   
  }
  renderTableItemsAnalyticCategories(questions, survey) {
      let categoryObjArr = []
      

  }

  render() {
    if (this.props.auth.isAuthenticated && this.state.gotSurveyData === false) {
      this.getOpenSurveys(this.props.auth.user.openSurveys)
      this.getClosedSurveyData(this.props.auth.user.closedSurveys)
      this.setState({ gotSurveyData: true });
    }

    function isExpired(survey) {
      let today = utils.formatDate(new Date())
      let closedDate = utils.formatDate(new Date(survey.close_date))
      if (closedDate < today) {
        return true
      }
      return false
    }

    function renderOpenSurveys(surveys) {
      let openSurveys = surveys.filter((survey) => {
        if (survey === null) {  return null }
        if (!isExpired(survey))
          return survey
      })
      return openSurveys
    }

    function renderClosedSurveys(surveys) {
      let closedSurveys = surveys.filter((survey) => {
        if (survey === null) {  return null }
        if (isExpired(survey))
          return survey
      })
      return closedSurveys
    }
    let headerAnswers = ["#", "Questions", "Type", "Category", "Answers"]
    let headerTrueFalse = ["T/F Question", "True Count", "False Count"]
    let headerCategories = ["Category", "Answers"]

    return (
      <div className="header">
        <h2>Open Surveys</h2>
        <div>
          {renderOpenSurveys(this.state.openSurveyDataList).map((survey) => {
            if(survey == null) return  <></>
            return <>
              <Collapsible
                title={survey.title_survey}
                surveyType="surveyResults"
                issueDate={'Issue Date: ' + utils.formatDate(new Date(survey.issued_date))}
                closingDate={'Closing Date: ' + utils.formatDate(new Date(survey.close_date))}>
                <h3>Questions</h3>
                
                <table id='surveys'>
                  <tbody>                    
                    <tr>{this.randerTableHeader(headerAnswers)}</tr>
                    {this.randerTableItems(survey)}
                  </tbody>
                </table>
                {/* ----- */}
                <h3>Analytics</h3>

              </Collapsible>
            </>
          })}
        </div>
        <br></br>
        <h2>Closed Surveys</h2>
        <div>
          {renderClosedSurveys(this.state.closedSurveyDataList).map((survey) => {
            if(survey == null) return  <></>
            return <>
              <Collapsible
                title={survey.title_survey}
                surveyType="closedSurvey"
                issueDate={'Issue Date: ' + utils.formatDate(new Date(survey.issued_date))}
                closingDate={'Closing Date: ' + utils.formatDate(new Date(survey.close_date))}>
                
                <h3>Questions</h3>     
                <table id='surveys'>
                  <tbody>
                    <tr>{this.randerTableHeader(headerAnswers)}</tr>
                    {this.randerTableItems(survey)}
                  </tbody>
                </table>

                {/* ----- */}
                <h3>Analytics</h3>
                <h4>True False Count</h4>
                <table id='surveys'>
                  <tbody>
                    <tr>{this.randerTableHeader(headerTrueFalse)}</tr>
                    {this.renderTrueFalseTableItems(survey)}
                  </tbody>
                </table>

                 <br></br>
                <h4>Categories</h4>
                <table id='surveys'>
                  <tbody>
                    <tr>{this.randerTableHeader(headerCategories)}</tr>
   
                  </tbody>
                </table>
              </Collapsible>
            </>
          })}
        </div>

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