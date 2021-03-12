import React from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import Navigation from "./Navigation.js";

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
            <button className="button">Login</button>
            <button className="reset">Reset Password</button>
          </header>
        </div>
      </div>
    )
  }
}

export default LoginPage;
