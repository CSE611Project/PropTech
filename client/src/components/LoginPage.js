import React from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import Navigation from "./Navigation.js";
import AdminAfterSign from "./AdminAfterSign.js"
import ResetPassword from "./ResetPassword.js"

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="LoginPage">
          <header className="Login-header">
            <h1 className="Title">PropTech</h1>
            <label className="EmailLabel">Email</label>
            <input type="text" />
            <label className="PasswordLabel">Password</label>
            <input type="password" />
            <button className="button" onClick={aftersign}>Login</button>
            <button className="reset" onClick={reset}>Reset Password</button>
          </header>
        </div>
      </div>
    )
  }
}

function aftersign() {
  return (ReactDOM.render(<AdminAfterSign />, document.getElementById('root')));
}

function reset() {
  return (ReactDOM.render(<ResetPassword />, document.getElementById('root')));
}

export default LoginPage;
