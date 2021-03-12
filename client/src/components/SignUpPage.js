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
              <label className="CompanyName">Company Name</label>
              <input type="text" />
              <label className="Email">Email</label>
              <input type="text" />
              <label className="Password">Password</label>
              <input type="password" />
              <label className="CompanyStreetName">Company Street Name</label>
              <input type="text" />
              <label className="SuiteNumber">Suite Number</label>
              <input type="text" />
              <label className="City">City</label>
              <input type="text" />
              <label className="State">State</label>
              <input type="text" />
              <label className="Zipcode">Zipcode</label>
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
