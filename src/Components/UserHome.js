import React, { Component } from 'react';
import '../css/style.css';
import Sidenav from './Sidenav.component';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import CreateSurvey from "./CreateSurvey.js";
import GivenSurveys from './GivenSurveys.js';
import YourSurveys from './YourSurveys';
import Analytics from './Analytics';


export default class UserHome extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
        <>
        <Sidenav>
        </Sidenav>
        
        <BrowserRouter>
          <Switch>
             <Route path="/" exact component={YourSurveys} />
             <Route path="/Home" exact component={YourSurveys} />
          </Switch>
        </BrowserRouter>
        </>
    );
  }
}