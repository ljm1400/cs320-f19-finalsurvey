import React, { Component } from 'react';
import '../css/style.css';
import MainContent from './MainContent';
import Sidenav from '../Components/Sidenav';

class Manager_Home extends Component {
  render() {
    return (
        <>
        <Sidenav>

        </Sidenav>
        
        {/* <div className="main">
            <h2>Your Surveys</h2>
            <p className="borders">Survey 1</p>
        </div> */}
        <MainContent></MainContent>
        </>
    );
  }
}
export default Manager_Home;