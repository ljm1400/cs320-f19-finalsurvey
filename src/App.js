import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Sidenav from "./Components/Sidenav.component"
import CreateSurvey from "./Components/CreateSurvey"
import GivenSurveys from "./Components/GivenSurveys"
import Analytics from "./Components/Analytics"
import YourSurveys from './Components/YourSurveys';
import TakingSurvey from './Components/TakingSurvey';
import login from './Components/login';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isManager: false,
      firstName: "John"
    }
  }

  render() {
    return (
      <Router>

        <div className="container">
          <Sidenav isManager={true} />
          <br/>
          <Route path="/" exact component={login} />
          <Route path="/YourSurveys" exact component={YourSurveys} />
          <Route path="/CreateSurvey" component={CreateSurvey} />
          <Route path="/GivenSurveys" component={GivenSurveys} />
          <Route path="/Analytics" component={Analytics} />
          <Route path="/TakingSurvey" component={TakingSurvey} />
          <Route path="/login" component={login} />
        </div>
      </Router>
    );
  }
  
}