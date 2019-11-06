import React, { Component } from 'react';
import '../css/style.css';
import axios from 'axios';
import Collapsible from '../Components/Collapsible';


export default class GivenSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveys: []
    };

  }

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

  render() {
    return (
        <div className="header">
            <h2>Given Surveys</h2>
            <div>
              {this.state.surveys.map((survey) => {
                   return <Collapsible title={survey.title_survey}>
                     <h3>Questions</h3>
                    <div className="surveyQuestions">
                        {survey.questions.map((question, index) => {
                          return <p>{index}) {question}</p>              
                        })}
                    </div>
                    </Collapsible>              
              })}
            </div>
        </div> 
      
    );
  }
}
