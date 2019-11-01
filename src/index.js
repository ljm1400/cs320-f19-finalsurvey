import React from 'react';
import ReactDOM from 'react-dom';
import ManagerHome from './pages/ManagerHome.js'
import CreateSurvey from './pages/CreateSurvey.js'
import { Switch, Route, Link } from 'react-router-dom';

const createSurv = () => (
    <Switch>
      <Route exact path='/CreateSurveys' component={CreateSurvey} />
    </Switch>
  )

ReactDOM.render(<ManagerHome />, document.getElementById('root'));
