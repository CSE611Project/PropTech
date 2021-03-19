import React from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import Navigation from "./Navigation.js";
import AdminAfterSign from "./AdminAfterSign.js";
import {cognito, userPool} from "./UserPool"

class LoginPage extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.changeEmail = this.changeEmail.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  changeEmail(event) {
    this.setState({
      email: event.target.value
    })
  }

  changePassword(event) {
    this.setState({
      password: event.target.value
    })
  }

  onSubmit(event) {
    event.preventDefault()

    const loginDetails = {
      Username: this.state.email,
      Password: this.state.password
    }
    const authenticationDetails = new cognito.AuthenticationDetails(loginDetails);
    const userDetails = {
      Username: this.state.email,
      Pool: userPool
    }
    const cognitoUser = new cognito.CognitoUser(userDetails);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log(result); // TODO save result
      },
      onFailure: function(err) {
        console.log(err);
      }
    })
    aftersign()
  }

  render() {
    return (
      <div>
        <Navigation />
        <div className="LoginPage">
          <header className="Login-header">
            <form onSubmit={this.onSubmit}>
            <h1>Please enter the information below</h1>
            <div id="login">
            <label htmlFor="email">Email</label>
              <input type="text" placeholder="Email"
              onChange={this.changeEmail}
              value={this.state.email} />
            <label htmlFor="Password">Password</label>
              <input type="password" placeholder="Password"
              onChange={this.changePassword}
              value={this.state.password} />
            <button className="LoginButton" type="submit" value="submit">Login</button>
            <button className="reset">Reset Password</button>
            </div>
            </form>
          </header>
        </div>
      </div>
    )
  }
}

function aftersign() {
  return (ReactDOM.render(<AdminAfterSign />, document.getElementById('root')));
}

export default LoginPage;
