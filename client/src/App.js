import React from "react";
import ReactDOM from 'react-dom';
import "./App.css";
import LoginPage from "./components/LoginPage.js";
import SignUpPage from "./components/SignUpPage.js";
import Navigation from "./components/Navigation.js";
import HomePage from "./components/HomePage.js";
import {BrowserRouter, Route} from "react-router-dom";

const LoginHeader = () => <h2>LoginHeader</h2>
const PropManaHeader = () => <h2>PropManaHeader</h2>
const AdminHeader = () => <h2>AdminHeader</h2>
const CusServHeader = () => <h2>CusServHeader</h2>

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route exact path="/" component={HomePage} />
          <Route path="/LoginPage" component={LoginPage} />
          <Route path="/SignUpPage" component={SignUpPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
