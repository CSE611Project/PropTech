import React, { useState } from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import RegProcess from "./RegProcess.js";
import Navigation from "./Navigation.js";
import UserPool from "./UserPool.js";
import axios from "axios";

{/*const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.error(err);
      }
      console.log(data);
    });
  };

  return(
    <div>
      <Navigation />
      <div className="SignUpPage" id="signup">
        <header className="SignUp-header">
          <form onSubmit={onSubmit}>
          <h1>Please enter the information below</h1>
          <div id="registration">
            <label className="CompanyName">Company Name</label>
            <input type="text" />
            <label htmlFor="email">Email</label>
            <input value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="text" />
            <label htmlFor="Password">Password</label>
            <input value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password" />
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
            <button type="submit">Register</button>
          </div>
          </form>
        </header>
      </div>
    </div>
  );
};*/}

class SignUpPage extends React.Component {
  constructor() {
    super()
    this.state = {
      company_name: '',
      email: '',
      password: '',
      street_name: '',
      suite_number: '',
      city: '',
      state_: '',
      zipcode: ''
    }
    this.changeCompanyName = this.changeCompanyName.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.changeStreetName = this.changeStreetName.bind(this)
    this.changeSuiteNumber = this.changeSuiteNumber.bind(this)
    this.changeCity = this.changeCity.bind(this)
    this.changeState = this.changeState.bind(this)
    this.changeZipcode = this.changeZipcode.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  changeCompanyName(event) {
    this.setState({
      company_name: event.target.value
    })
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

  changeStreetName(event) {
    this.setState({
      street_name: event.target.value
    })
  }

  changeSuiteNumber(event) {
    this.setState({
      suite_number: event.target.value
    })
  }

  changeCity(event) {
    this.setState({
      city: event.target.value
    })
  }

  changeState(event) {
    this.setState({
      state_: event.target.value
    })
  }

  changeZipcode(event) {
    this.setState({
      zipcode: event.target.value
    })
  }

  onSubmit(event) {
    event.preventDefault()

    const registered = {
      company_name: this.state.company_name,
      email: this.state.email,
      password: this.state.password,
      street_name: this.state.street_name,
      suite_number: this.state.suite_number,
      city: this.state.city,
      state_: this.state.state_,
      zipcode: this.state.zipcode
    }

    axios.post('http://localhost:3000/signup', registered)

    this.setState = {
      company_name: '',
      email: '',
      password: '',
      street_name: '',
      suite_number: '',
      city: '',
      state_: '',
      zipcode: ''
    }

  }

  render() {
    return (
      <div>
        <Navigation />
        <div className="SignUpPage" id="signup">
          <header className="SignUp-header">
            <form onSubmit={this.onSubmit}>
            <h1>Please enter the information below</h1>
            <div id="registration">

              <label className="CompanyName">Company Name</label>
              <input type="text" placeholder="Company Name"
              onChange={this.changeCompanyName}
              value={this.state.company_name} />

              <label htmlFor="email">Email</label>
              <input type="text" placeholder="Email"
              onChange={this.changeEmail}
              value={this.state.email} />

              <label htmlFor="Password">Password</label>
              <input type="password" placeholder="Password"
              onChange={this.changePassword}
              value={this.state.password} />

              <label className="CompanyStreetName">Company Street Name</label>
              <input type="text" placeholder="Company Street Name"
              onChange={this.changeStreetName}
              value={this.state.street_name} />

              <label className="SuiteNumber">Suite Number</label>
              <input type="text" placeholder="Suite Number"
              onChange={this.changeSuiteNumber}
              value={this.state.suite_number} />

              <label className="City">City</label>
              <input type="text" placeholder="City"
              onChange={this.changeCity}
              value={this.state.city} />

              <label className="State">State</label>
              <input type="text" placeholder="State"
              onChange={this.changeState}
              value={this.state.state_} />

              <label className="Zipcode">Zipcode</label>
              <input type="text" placeholder="Zipcode"
              onChange={this.changeZipcode}
              value={this.state.zipcode} />

              <button className="registerButton" type="submit" value="submit">Register</button>
            </div>
            </form>
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
