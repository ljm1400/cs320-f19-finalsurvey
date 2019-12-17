import React, { Component} from 'react';
import { Redirect } from 'react-router-dom'
import {ListGroupItem} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/style.css';
import * as utils from './Utils.js'

class YourSurveys extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    redirect: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state ={
      redirect: false,
      check: false,
      updatedManagerClosedList: false,
      render: false,
      openSurveyIdList: [],
      openSurveyDataList: [],
      closedSurveyIdList: [],
      closedSurveyDataList:[],
      renderOpen: [],
      renderClosed:[],
      manager: null,
      user: null,
      takingSurvey: null
    }
  }
  setRedirect = (index) => {
      this.setState({
        redirect: true,
        takingSurvey: this.state.renderOpen[index]
      })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={
          {
            pathname: '/TakingSurvey',
            state: {
              survey: this.state.takingSurvey
            }    
          }} />
    }
  }


  getManager = (user) => {
  const {managerId, companyId} = user
    axios.get('http://localhost:5000/users/getUser/', {params:{employeeId: managerId, companyId}})
    .then(manager => {
      this.setState({user, manager: manager.data})
      this.setState({openSurveyIdList: manager.data.openSurveys}, this.getOpenSurveyData)
      this.setState({closedSurveyIdList: manager.data.closedSurveys}, this.getClosedSurveyData)
    })
  }

  getOpenSurveyData = () => {
      let surveyDataList = []
      let requests = []
      if(!this.state.openSurveyIdList){
        this.setState({openSurveyDataList: []})
      }
      else{
        this.state.openSurveyIdList.forEach(function(survey) {
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
          this.setState({openSurveyDataList: surveyDataList})
        })
      }
  }

  getClosedSurveyData = () => {
      let surveyDataList = []
      let requests = []
      if(!this.state.openSurveyIdList){
        this.setState({openSurveyDataList: []})
      }
      else{
        this.state.closedSurveyIdList.forEach(function(survey) {
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
  }

  checkOpenForExpired(){
    let closed = this.state.closedSurveyIdList;
    let open = this.state.openSurveyDataList;
    let newOpen = []
    let today = utils.formatDate(new Date())
       
    open.map((survey) => {
      if(survey!== null){
        let closeDate = utils.formatDate(new Date(survey.close_date))
        if(closeDate < today){
          closed.push(survey._id)
        }
        else{
          newOpen.push(survey._id)
        }
      }
    })
    this.setState({openSurveyIdList: newOpen}, this.getOpenSurveyData)
    this.setState({closedSurveyIdList: closed}, this.getClosedSurveyData)
    this.setState({check: true})
  }

  isCompleted(survey, user) {
    let found = false
    survey.answers.forEach((ansArr) => {
      if (user._id == ansArr[0] || user.id == ansArr[0]) {
        found = true
        return false // breaks foreach loop, doesn't return out of function
      }
    })
    console.log(found)
    return found
  }

  updateManagerLists() {
    let manager = this.state.manager
    axios.post('http://localhost:5000/users/updateboth/', 
    {openSurveys: this.state.openSurveyIdList, closedSurveys: this.state.closedSurveyIdList }, 
    {params:{employeeId: manager.employeeId, companyId: manager.companyId}})
      .then(res => console.log("Updated Manager Survey Information: " + res.data))
    this.setState({updatedManagerClosedList: true})
  }

  renderOpenAndCompleted(user) {
    let renderCompleted = []
    let renderOpen = []

    this.state.openSurveyDataList.forEach((survey) => {
      if(survey != null){
        console.log(survey)
        if(this.isCompleted(survey, user) == true){
          console.log("adding completed survey")
          renderCompleted.push(survey)
        }
        else {
          console.log("adding open survey")
          renderOpen.push(survey)
        }
      }
    })
    this.setState({renderClosed: renderCompleted, 
      renderOpen: renderOpen, 
      render: true})
  }


  render() {
    let auth = this.props.auth
    if(auth.isAuthenticated && this.state.manager === null) {
      this.getManager(auth.user)
    } 
    if(auth.isAuthenticated) {
      if(this.state.check === false && this.state.openSurveyDataList.length !== 0){
        this.checkOpenForExpired()
      }
      if(this.state.check === true && this.state.updatedManagerClosedList === false){
        this.updateManagerLists()
      }
      if(this.state.check === true && this.state.updatedManagerClosedList === true && this.state.render === false){
        this.renderOpenAndCompleted(auth.user)
      }
    }
    
    if(this.state.openSurveyDataList.length === 0) {
      return <div className="header">
        <h1>You have no open surveys to complete</h1>
      </div>
    }
      
    return (
        <div className="header">
          {this.renderRedirect()}
          <h2>Surveys To Do</h2>
          <div>
              {this.state.renderOpen.length != 0 ? this.state.renderOpen.map((survey, index) => {
                  if(survey === null) {return null}
                  return <>
                    <button className="surveyResults" 
                      onClick={ ()=> this.setRedirect(index)}>{survey.title_survey}  
                      <br></br>
                      {'Closing Date: ' + utils.formatDate(new Date(survey.close_date))}
                      <br></br>
                    </button>
                  </>
              }): "You have no surveys to complete"}                                
          </div>
          <br></br> 
          <h2>Completed Surveys</h2>
          <div>
              {this.state.renderClosed.length != 0 ? this.state.renderClosed.map((survey, index) => {
                if(survey == null) return null
                 return <>
                 <button className="closedSurvey">{survey.title_survey}  
                   <br></br>
                   {'Close Date: ' + utils.formatDate(new Date(survey.close_date))}
                   <br></br>
                   
                 </button>
               </>
              }): "You have not completed any surveys"}
          </div>  
          <br></br>

          <h2>Closed Surveys</h2>
          <div>
              {this.state.closedSurveyDataList.length != 0 ? this.state.closedSurveyDataList.map((survey, index) => {
                 if(survey == null) return null
                 return <>
                 <button className="closedSurvey">{survey.title_survey}  
                   <br></br>
                   {'Close Date: ' + utils.formatDate(new Date(survey.close_date))}
                   <br></br>                   
                 </button>
               </>
              }): "There are no closed surveys"}
          </div>  
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
