import React from "react";
import "./App.css";
import HomePage from "./components/Login/HomePage.js";
import RegProcess from "./components/Login/RegProcess";
import ResetProcess from "./components/Login//ResetProcess";
import LoginPage from "./components/Login/LoginPage.js";
import SignUpPage from "./components/Login/SignUpPage.js";
import ResetPassword from "./components/Login/ResetPassword.js";
import Navigation from "./components/NavigationBar/Navigation.js";
import Abouts from "./components/NavigationBar/About.js";
import AdminAfterSign from "./components/Admin/AdminAfterSign.js";
import PropManaAfterSign from "./components/PropMana/PropManaAfterSign.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://3.131.169.6:3000/";
axios.defaults.withCredentials = true;
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/LoginPage" component={LoginPage} />
          <Route exact path="/SignUpPage" component={SignUpPage} />
          <Route exact path="/About" component={Abouts} />
          <Route exact path="/ResetPassword" component={ResetPassword} />
          <Route exact path="/Admin" component={AdminAfterSign} />
          <Route exact path="/Admin/propertyManagers" component={AdminAfterSign} />
          <Route exact path="/PropMana" component={PropManaAfterSign} />
          <Route exact path="/PropMana/:sub" component={PropManaAfterSign} />
          <Route exact path="/PropMana/:sub/property" component={PropManaAfterSign} />
          <Route exact path="/PropMana/:sub/property/:property_id" component={PropManaAfterSign} />
          <Route exact path="/PropMana/:sub/invoiceHistory" component={PropManaAfterSign} />
          <Route exact path="/PropMana/:sub/user_info" component={PropManaAfterSign} />
          <Route exact path="/Admin/PropMana/:sub" component={PropManaAfterSign} />
          <Route exact path="/Admin/PropMana/:sub/property" component={PropManaAfterSign} />
          <Route exact path="/Admin/PropMana/:sub/property/:property_id" component={PropManaAfterSign} />
          <Route exact path="/Admin/PropMana/:sub/invoiceHistory" component={PropManaAfterSign} />
          <Route exact path="/Admin/PropMana/:sub/user_info" component={PropManaAfterSign} />
          <Route exact path="/RegProcess" component={RegProcess} />
          <Route exact path="/ResetPassword" component={ResetPassword} />
          <Route exact path="/ResetProcess" component={ResetProcess} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
