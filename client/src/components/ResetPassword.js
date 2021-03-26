import React from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import Navigation from "./Navigation.js";
import ResetProcess from "./ResetProcess.js";
import {cognito, userPool} from "./UserPool";

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

function resetPassword(username) {
  var cognitoUser = new cognito.CognitoUser({
      Username: username,
      Pool: userPool
  });

  cognitoUser.forgotPassword({
      onSuccess: function(result) {
          console.log('call result: ' + result);
      },
      onFailure: function(err) {
          alert(err);
      }
  });
}

function confirmPassword(username, verificationCode, newPassword) {
  var cognitoUser = new cognito.CognitoUser({
      Username: username,
      Pool: userPool
  });

  return new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(verificationCode, newPassword, {
          onFailure(err) {
              reject(err);
          },
          onSuccess() {
              resolve();
          },
      });
  });
}

export default ResetPassword;