import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import Navigation from "./Navigation.js";
import AdminAfterSign from "./AdminAfterSign.js";
import PropManaAfterSign from "./PropManaAfterSign.js";
import ResetPassword from "./ResetPassword.js";
import axios from "axios";
import { cognito, userPool } from "./UserPool";

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
              <h1 className="Title">PropTech</h1>

              <label className="EmailLabel">Email</label>
              <input type="text" placeholder="Email" onChange={this.changeEmail} value={this.state.email} required />

              <label className="PasswordLabel">Password</label>
              <input type="password" placeholder="Password" onChange={this.changePassword} value={this.state.password} required />

              <button className="button" type="submit" value="submit">
                Login
              </button>
              <button className="reset" onClick={reset}>
                Reset Password
              </button>
            </header>
          </form>
        </div>
      </div>
    );
  }
}

function adminaftersign() {
  window.location = "/AdminAfterSign";
  return ReactDOM.render(<AdminAfterSign />, document.getElementById("root"));
}

function propmanaaftersign() {
  window.location = "/PropManaAfterSign";
  return ReactDOM.render(<PropManaAfterSign />, document.getElementById("root"));
}

function reset() {
  window.location = "/ResetPassword";
  return ReactDOM.render(<ResetPassword />, document.getElementById("root"));
}

export default LoginPage;
