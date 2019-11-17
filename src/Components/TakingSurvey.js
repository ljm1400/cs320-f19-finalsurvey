import React, { Component } from 'react';
import '../css/style.css';

export default class TakingSurvey extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
        <div className="header">
            <h2>Taking Survey 1</h2>
            <p>question 1</p>
        </div> 
    );
  }
}
