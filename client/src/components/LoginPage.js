import React, { useState } from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import Navigation from "./Navigation.js";
import AdminAfterSign from "./AdminAfterSign.js"
import ResetPassword from "./ResetPassword.js"
import axios from "axios";

class LoginPage extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }

    this.setEmail = this.setEmail.bind(this)
    this.setPassword = this.setPassword.bind(this)
  }

  setEmail(event) {
    this.setState({
      email: event.target.value
    })
  }

  setPassword(event) {
    this.setState({
      password: event.target.value
    })
  }

  onSubmit(event) {
    event.preventDefault()

    const loginInfo = {
      email: this.state.email,
      password: this.state.password
    }

    axios.post('/login', loginInfo).then(
      response => console.log(response.data)
    )

    aftersign()
  }

  render() {
    return (
      <div>
        <div className="LoginPage">
          <form onSumibt={this.onSubmit}>
            <header className="Login-header">
              <h1 className="Title">PropTech</h1>

              <label className="EmailLabel">Email</label>
              <input type="text" placeholder="Email"
              onChange={this.setEmail}
              value={this.state.email} />

              <label className="PasswordLabel">Password</label>
              <input type="password" placeholder="Password"
              onChange={this.setPassword}
              value={this.state.password} />

              <button className="button" type="submit" value="submit">Login</button>
              <button className="reset" onClick={reset}>Reset Password</button>
            </header>
          </form>
        </div>
      </div>
    )
  }
}

function aftersign() {
  window.location = '/AdminAfterSign'
  return (ReactDOM.render(<AdminAfterSign />, document.getElementById('root')));
}

function reset() {
  window.location = '/ResetPassword'
  return (ReactDOM.render(<ResetPassword />, document.getElementById('root')));
}


export default LoginPage;
