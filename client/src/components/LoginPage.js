import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import Navigation from "./Navigation.js";
import AdminAfterSign from "./AdminAfterSign.js";
import PropManaAfterSign from "./PropManaAfterSign.js";
import ResetPassword from "./ResetPassword.js";
import axios from "axios";
import { cognito, userPool } from "./UserPool";

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };

    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  changePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    console.log(this);
    const loginDetails = {
      Username: this.state.email,
      Password: this.state.password,
    };
    const authenticationDetails = new cognito.AuthenticationDetails(loginDetails);
    const userDetails = {
      Username: this.state.email,
      Pool: userPool,
    };
    const cognitoUser = new cognito.CognitoUser(userDetails);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log(result);
        axios
          .post("/auth", {
            accessToken: result.accessToken.jwtToken,
            idToken: result.idToken.jwtToken,
          })
          .then((response) => {
            console.log(response.data);
            let userType = response.data.accessData["cognito:groups"][0];
            if (userType == "PropertyManager") {
              sessionStorage.setItem("username", response.data.idData.email);
              sessionStorage.setItem("sub", response.data.accessData.sub);
              propmanaaftersign();
            } else if (userType == "Admin") {
              adminaftersign();
            }
          });
      },
      onFailure: function (err) {
        console.log(err);
      },
    });
  }

  render() {
    return (
      <div>
        <div className="LoginPage">
          <form onSubmit={this.onSubmit}>
            <header className="Login-header">
            <Typography component="h1" variant="h1" color="primary" >
              PropTech
            </Typography>

              {/*<label className="EmailLabel">Email</label>
              <input type="text" placeholder="Email" onChange={this.changeEmail} value={this.state.email} required />*/}
              <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Enter your email"
                            type="text"
                            onChange={this.changeEmail}
                            value={this.state.email}           
              />
              {/*<label className="PasswordLabel">Password</label>
              <input type="password" placeholder="Password" onChange={this.changePassword} value={this.state.password} required />*/}
              <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="text"
                            onChange={this.changePassword}
                            value={this.state.password}           
              />
              <Divider />
              <Divider />
              <Divider />
              <Divider />
              <Divider />
              <Divider />
              <Button color="primary" type="submit" value="submit">
                Login
              </Button>
              <Divider />
              <Divider />
              <Divider />
              <Divider />
              <Divider />
              <Divider />
              <Button color="primary" onClick={reset}>
                Reset Password
              </Button>
            </header>
          </form>
        </div>
      </div>
    );
  }
}

function adminaftersign() {
  window.location = "/AdminAfterSign";
}

function propmanaaftersign() {
  window.location = `/PropMana/${sessionStorage.getItem("sub")}`;
}

function reset() {
  window.location = "/ResetPassword";
}

export default LoginPage;
