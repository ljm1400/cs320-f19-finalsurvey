import React, { Component, createContext } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Redirect } from 'react-router'
import store from './store'
import Sidenav from "./Components/Sidenav.component"
import CreateSurvey from "./Components/CreateSurvey"
import GivenSurveys from "./Components/GivenSurveys"
import Analytics from "./Components/Analytics"
import YourSurveys from './Components/YourSurveys';
import TakingSurvey from './Components/TakingSurvey';
import loginModal from './Components/login';
import { Provider } from 'react-redux';
import {loadUser} from './actions/authActions'

const UserObjContext = React.createContext('');
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state ={
      user: {}
    };
  }
  componentDidMount() {
    store.dispatch(loadUser());
  }
  onUserChange = (user1) => {
    this.setState({
      user: user1
    });
  }
  
  render() {
    const mySidenav= () => {
      return (
        <Sidenav />
      );
    }

    return (
      <Provider store={store}>
        <UserObjContext.Provider value={this.state.user}>
          <Router>
              <div>
              <Route exact path="/" render={() => (
                  <Redirect to="/login"/>
              )}/>  

              <Switch>
                <Route path="/login"/>
                <Route path="/" render={mySidenav} />   
              </Switch>
              
              <Switch>
                <Route path="/login" component={loginModal} />
                <Route path="/YourSurveys" exact component={YourSurveys} />
                <Route path="/CreateSurvey" component={CreateSurvey} />
                <Route path="/GivenSurveys" component={GivenSurveys} />
                <Route path="/Analytics" component={Analytics} />
                <Route path="/TakingSurvey" component={TakingSurvey} />
              </Switch> 
              </div>      
          </Router>
        </UserObjContext.Provider>
      </Provider>

    );
  }
  
}