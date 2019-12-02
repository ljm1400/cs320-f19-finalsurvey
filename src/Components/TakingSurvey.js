import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import '../css/style.css';
import Answer from './Answer';
import { Button, Form, FormGroup } from 'reactstrap';
import * as Utils from './Utils.js'

export default class TakingSurvey extends Component {
  constructor(props) {
    super(props);
    if(this.props.location.state){
      let survey = this.props.location.state.survey
      let formatted_Close_Date = Utils.formatDate(new Date(survey.close_date))
      let formatted_Issue_Date = Utils.formatDate(new Date(survey.issued_date))

      this.state = {
        survey: survey,
        close_date: formatted_Close_Date,
        issued_date: formatted_Issue_Date,
        surveyAnswers: [],
        redirect: false
      }  
    }
    else{
      this.state = {
        survey: null,
        close_date: null,
        issued_date: null,
        surveyAnswers: [],
        redirect: true
      }  
    }
  }


  
  changeAnswers(answers) {
    this.setState({
      surveyAnswers: answers
    })
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
      return <Redirect to={
        {
          pathname: '/YourSurveys'    
        }} />
    }
  

  handleSubmitButton() {
    alert('You have submitted your survey. Thank you!');
  }

  randerTableHeader() {
    let header = ["#", "Question", "Category", "Your Answer"]
    return header.map((key, index) => {
      return <th key={index}>{key}</th>
    })
  }

  randerTableItems(questions) {
    return questions.map((questionObj, index) => {
      // temporarily hardcode survey answers
      return (
        <tr>
          <td>{questionObj.num}</td>
          <td>{questionObj.name}</td>
          <td>{questionObj.category}</td>
          <td><Answer questionObj={questionObj}></Answer></td>
        </tr>
      )
    })
  }

  render() {
    if(this.state.survey)
    return (
        <div className="header">
            <h2>{"Taking Survey: " + this.state.survey.title_survey}</h2>
            <h4>{"Issue Date: " + this.state.issued_date}</h4>
            <h4>{"Close Date: " + this.state.close_date}</h4>
            
            <form className="surveyQuestions" onSubmit={this.handleSubmitButton}>
                <table id='surveys'>
                    <tbody>
                      <tr>{this.randerTableHeader()}</tr>
                      {this.randerTableItems(this.state.survey.questions)}
                    </tbody>
                </table>

              <Button color="success">Submit Survey</Button>{' '}
              {/* don't need onClick for button, since form is handling the onSubmit */}
            </form>
        </div> 
    );
    else
    return this.renderRedirect();
  }
}
