import React, { Component } from 'react';
import '../css/style.css';
import axios from 'axios';


const Survey = props => (
  <p>{props.survey.questions}</p>
)

export default class GivenSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {surveys: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/surveys/')
      .then(response => {
        this.setState({surveys: response.data })
        console.log("Got surveys");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  surveyList() {
    return this.state.surveys.map(curr => {
      return <p className="surveyResults"> {curr.title_survey}</p>
    })
  }

  Collapse() {
    var coll = document.getElementsByClassName("collapsible");
    var i;
    
    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  }

  render() {
    return (
        <>
        <div className="header">
            <h2>Given Surveys</h2>
            <button className="collapsible" ref="document" >Survey 1</button>
            <div className="content">
              <p>fefefefe</p>
            </div>

            <p>{this.surveyList()}</p>
        </div> 
        </>
    );
  }
}
