import React, { Component} from 'react';
import { Redirect } from 'react-router-dom'
import {ListGroupItem} from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/style.css';

class YourSurveys extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    redirect: PropTypes.bool
  };

  constructor(props) {
    super(props);
    console.log(props.auth.user)

    this.state ={
      redirect: false,
      surveyIdList: [],
      surveyDataList: [],
      manager: null,
      user: this.props.auth.user,
      takingSurvey: null
    }
  
  }

  componentDidMount() {
    /**
     * get manager id to get open surveys, 
     * then callback function on set state for surveyIdList to get the actual survey data
    */
    this.getManager(this.state.user)
  }

  setRedirect = (index) => {
      this.setState({
        redirect: true,
        takingSurvey: this.state.surveyDataList[index]
      })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      console.log('b' + this.state.takingSurvey)
      return <Redirect to={
          {
            pathname: '/TakingSurvey',
            state: {survey: this.state.takingSurvey}    
          }} />
    }
  }

  getManager = (user) => {
  const {managerId, companyId} = user
    axios.get('http://localhost:5000/users/getUser/', {params:{employeeId: managerId, companyId}})
    .then(user => {
      this.setState({manager: user.data})
      this.setState({surveyIdList: user.data.openSurveys}, this.getSurveyData)
    })
  }

  getSurveyData = () => {
      let surveyDataList = []
      let requests = []

      this.state.surveyIdList.forEach(function(survey) {
          requests.push(
            axios.get('http://localhost:5000/surveys/'+ survey)
          .then(survey => {
            surveyDataList.push(survey.data)
          })
      )})

       // Need to use Promise.all() to make sure setState will update the surveyDataList AFTER all requests finished
      Promise.all(requests).then((val) => {
        this.setState({surveyDataList: surveyDataList})
      })
  }

  render() {
    // const{isAuthenticated, user} = this.props.auth;
    // const {manager} = this.state
    
    // if(isAuthenticated){
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
    //   var surveys = this.state.surveyIds;
    //   if(!surveys){
    //     return <div className="header">
    //     <h2>You have no open surveys</h2>
    //     <p>{manager ? "Your manager's name is: " + `${manager.firstName}`:''}</p>
    //     </div>
    //   }
    // }

    return (
        <div className="header">
          <h2>Your Surveys</h2>
          {this.renderRedirect()}
          <div>
              <p>{this.state.manager ? "Your manager is " + `${this.state.manager.firstName}`:''}</p>
              {this.state.surveyDataList.map((survey, index) => {
                  return <>
                    <button className="surveyResults" 
                      onClick={ ()=> this.setRedirect(index)}>{survey.title_survey} </button>
                  </>
              })}                                
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
