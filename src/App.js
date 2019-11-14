import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./Components/Sidenav.component"
import ManagerHome from "./Components/ManagerHome"
import CreateSurvey from "./Components/CreateSurvey"
import GivenSurveys from "./Components/GivenSurveys"

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={ManagerHome} />
      <Route path="/createsurvey" component={CreateSurvey} />
      <Route path="/GivenSurveys" component={GivenSurveys} />
      </div>
    </Router>
  );
}
export default App;