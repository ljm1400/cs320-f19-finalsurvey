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
      send: false,
      openSurveyIdList: [],
      openSurveyDataList: [],
      closedSurveyIdList: [],
      closeSurveyDataList:[],
      manager: null,
      user: null,
      takingSurvey: null
    }
  }
  setRedirect = (index) => {
      this.setState({
        redirect: true,
        takingSurvey: this.state.openSurveyDataList[index]
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
  let man = null;
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

  getClosedSurveyData = () => {
      let surveyDataList = []
      let requests = []

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
        if(this.isCompleted(survey)){
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

  isCompleted(survey) {
    let user = this.state.user
    console.log(user)
    survey.answers.map((ansArr) => {
      console.log(ansArr[0])
      if(ansArr[0] === user._id) {
        console.log(ansArr[0] === user._id)
        return true
      }
    })
    return false
  }

  updateManagerLists(){
    let manager = this.state.manager
    axios.post('http://localhost:5000/users/updateboth/', {openSurveys: this.state.openSurveyIdList, closedSurveys: this.state.closedSurveyIdList }, {params:{employeeId: manager.employeeId, companyId: manager.companyId}})
      .then(res => console.log("Updated Manager Survey Information: " + res.data))
    this.setState({send: true})
  }


  render() {
    let user = this.props.auth.user
    if(this.props.auth.isAuthenticated && this.state.manager === null) {
      this.getManager(this.props.auth.user)
    }
    if(this.state.manager !== null && this.state.openSurveyDataList.length !== 0 && this.state.check === false){
      this.checkOpenForExpired()
    }
    if(this.state.manager !== null && this.state.check === true && this.state.send === false){
      this.updateManagerLists()
    }
    //const{isAuthenticated, user} = this.props.auth;
    // const {manager} = this.state
    
    //if(isAuthenticated)
    //   if(manager === null){
    //     this.getManager(user)
    //   }
    //   if(user.positionTitle.includes("CEO")){
    //     return (
    //     <div className="header">
    //       <h1>Your Surveys</h1>
    //       <h2> You have no surveys, you are the CEO!!!</h2>
    //       <h3> Consider Creating a survey!</h3>
    //     </div> 
    //     );
    //   }

      if(this.state.openSurveyIdList.length === 0) {
        return <div className="header">
          <h1>You have no open surveys to complete</h1>
        </div>
      }

      
      

      

      

    return (
        <div className="header">
          <h2>Surveys To Do</h2>
          {this.renderRedirect()}
          <div>
              {this.state.openSurveyDataList.map((survey, index) => {
                  if(survey === null) {return null}
                  return <>
                    <button className="surveyResults" 
                      onClick={ ()=> this.setRedirect(index)}>{survey.title_survey}  
                      <br></br>
                      {'Closing Date: ' + utils.formatDate(new Date(survey.close_date))}
                      <br></br>
                    </button>
                  </>
              })}                                
          </div>
          <br></br> 
          <h2>Completed Surveys</h2>    
          <div>
              {this.state.closedSurveyDataList ? this.state.closedSurveyDataList.map((survey, index) => {
                 return <>
                 <button className="closedSurvey">{survey.title_survey}  
                   <br></br>
                   {'Closing Date: ' + utils.formatDate(new Date(survey.close_date))}
                   <br></br>
                   
                 </button>
               </>
              }): "You have not completed any surveys"}
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
