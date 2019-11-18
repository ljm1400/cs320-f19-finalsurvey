import React, { Component} from 'react';
import { Redirect } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import '../css/style.css';


export default class login extends Component {
    
    constructor(props) {
        super(props);
        this.state ={
          email: "",
          password: "",
          redirect: false,
          surveyIds: []
        }
    }
    _handleEmailChange= (e) => {
      this.setState({
          email: e.target.value
      });
    }

    _handlePasswordChange= (e) => {
      this.setState({
          password: e.target.value
      });
    }

    setRedirect = () => {
      console.log("clickS")
      this.setState({
        email: TextField.email,
        password: TextField.password,
        redirect:true
      })
      //axios.post("http://localhost:5000/auth/", this.state)

      console.log(this.state.redirect)
    }

    renderRedirect() {
      if (this.state.redirect) {
        return <Redirect to={
            {
              pathname: '/YourSurveys',
              state: {surveyId: 1}    
            }} />
      }
    }
    render() {
        return (
            <div>
                <div className="header">
                  <h2>Log In</h2> 
                  <p></p>
                  <TextField
                    required
                    id="email"
                    label="Enter Email"
                    Value="Email@Email.com"
                    margin="normal"
                    onChange = {this._handleEmailChange}
                  />
                  <p></p>
                  <TextField
                    required
                    id="password"
                    label="Enter Password"
                    Value="password"
                    margin="normal"
                    onChange = {this._handlePasswordChange}
                  />
                  <p></p>
                  {this.renderRedirect()}
                  <Button variant="outlined" onClick={this.setRedirect}>
                    Log In
                    
                  </Button>
                </div> 
            </div> 
        );
      }
    }