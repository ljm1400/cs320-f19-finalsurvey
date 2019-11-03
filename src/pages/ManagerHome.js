import React, { Component } from 'react';
import '../css/style.css';
import Sidenav from '../Components/Sidenav';
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import CreateSurvey from './CreateSurvey.js';
import GivenSurveys from './GivenSurveys.js';
import YourSurveys from './YourSurveys';


class Manager_Home extends Component {
  render() {
    return (
        <>
        <Sidenav>
        </Sidenav>
        
        <BrowserRouter>
          <Switch>
            <Route exact path='/Home' component={YourSurveys} />
            <Route exact path='/CreateSurvey' component={CreateSurvey} />
            <Route exact path='/GivenSurveys' component={GivenSurveys} />
          </Switch>
        </BrowserRouter>
        </>
    );
  }
}
export default Manager_Home;