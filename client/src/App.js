import React from "react";
import ReactDOM from 'react-dom';
import "./App.css";
import LoginPage from "./components/LoginPage.js";
import SignUpPage from "./components/SignUpPage.js";
import Navigation from "./components/Navigation.js";
import HomePage from "./components/HomePage.js";
import Abouts from "./components/About.js"
import ResetPassword from "./components/ResetPassword.js"
import AdminAfterSign from "./components/AdminAfterSign.js"
import PropManaAfterSign from "./components/PropManaAfterSign.js"
import {BrowserRouter, Route} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" component={HomePage} />
          <Route path="/LoginPage" component={LoginPage} />
          <Route path="/SignUpPage" component={SignUpPage} />
          <Route path="/About" component={Abouts} />
          <Route path="/ResetPassword" component={ResetPassword} />
          <Route path="/AdminAfterSign" component={AdminAfterSign} />
          <Route path="/PropManaAfterSign" component={PropManaAfterSign} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
