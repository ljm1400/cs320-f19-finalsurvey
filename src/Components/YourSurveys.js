import React, { Component} from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

import '../css/style.css';

class YourSurveys extends Component {
  constructor(props) {
    super(props);
    this.state ={
      redirect: false,
      surveyIds: []
    }
  }

  setRedirect = () => {
    console.log("clickS")
    this.setState({
      redirect: true
    })
    console.log(this.state.redirect)
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/TakingSurvey' />
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/surveys/')
      .then(response => {
        if(response.data.length > 0) {
          this.setState({
            surveyIds: response.data
          })
        }
        console.log(this.state.surveyIds);
      })
      .catch((error) => {
        console.log(error);
      })
  }

 
  render() {
    return (
        <div className="header">
            <h2>Your Surveys</h2>
            {this.renderRedirect()}
            <button onClick={this.setRedirect} className="surveyResults" >Survey 1</button>
        </div> 
    );
  }
}
export default YourSurveys;