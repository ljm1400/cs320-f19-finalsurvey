import React, { Component} from 'react';
import { Redirect } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import '../css/style.css';

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    button: {
        margin: theme.spacing(1),
      },
      input: {
        display: 'Logged In',
      },
  }));

export default class login extends Component {
    
    constructor(props) {
        super(props);
        this.state ={
          redirect: false,
          surveyIds: []
        }
    }

    setRedirect = () => {
      console.log("clickS")
      this.setState({
        redirect: true
      })
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
                    id="standard-required"
                    label="Enter Email"
                    Value="Email@Email.com"
                    margin="normal"
                  />
                  <p></p>
                  <TextField
                    required
                    id="standard-required"
                    label="Enter Password"
                    Value="password"
                    margin="normal"
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