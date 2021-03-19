import React from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import Navigation from "./Navigation.js";
import ResetProcess from "./ResetProcess.js";

class ResetPassword extends React.Component {
  render() {
    return (
      <div>
        <div className="ResetPassword">
          <header className="Login-header">
            <label>Enter your old password:</label>
            <input type="password" />
            <label>Enter your new password:</label>
            <input type="password" />
            <label>Re-enter your new password:</label>
            <input type="password" />
            <button className="button" onClick={reset}>Reset</button>
          </header>
        </div>
      </div>
    )
  }
}

function reset() {
  window.location = "/ResetProcess"
  return (ReactDOM.render(<ResetProcess />, document.getElementById('root')));
}

export default ResetPassword;
