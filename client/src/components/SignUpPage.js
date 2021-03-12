import React from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import RegProcess from "./RegProcess.js"
import Navigation from "./Navigation.js"

class SignUpPage extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="SignUpPage" id="signup">
          <header className="SignUp-header">
            <h1>Please enter the information below</h1>
            <div id="registration">
              <label>Name</label>
              <input type="text" />
              <label>Email</label>
              <input type="text" />
              <label>Password</label>
              <input type="password" />
              <label>Enter Your Password Again</label>
              <input type="password" />
              <label>Street Name</label>
              <input type="text" />
              <label>Suite Number</label>
              <input type="text" />
              <label>City</label>
              <input type="text" />
              <label>State</label>
              <input type="text" />
              <label>Zipcode</label>
              <input type="text" />
              <button className="registerButton" onClick={regprocess}>Register</button>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

function regprocess () {
  return (ReactDOM.render(<RegProcess />, document.getElementById('root')));
}

export default SignUpPage;
