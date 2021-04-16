import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import LoginPage from "./components/LoginPage.js";
import SignUpPage from "./components/SignUpPage.js";
import Navigation from "./components/Navigation.js";
import HomePage from "./components/HomePage.js";
import Abouts from "./components/About.js";
import ResetPassword from "./components/ResetPassword.js";
import AdminAfterSign from "./components/AdminAfterSign.js";
import PropManaAfterSign from "./components/PropManaAfterSign.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RegProcess from "./components/RegProcess";
import ResetProcess from "./components/ResetProcess";
import ApplicationStatus from "./components/ApplicationStatus";
import ManaInfo from "./components/ManaInfo";
import EditUserAccount from "./components/EditUserAccount";
import TenantInfo from "./components/TenantInfo";
import PropertyInfo from "./components/PropertyInfo";
import BillTimeCheckBox from "./components/BillTimeCheckBox";
import InvoiceHistory from "./components/InvoiceHistory";
import IndividualTenantInvoice from "./components/IndividualTenantInvoice";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/LoginPage" component={LoginPage} />
          <Route path="/SignUpPage" component={SignUpPage} />
          <Route path="/About" component={Abouts} />
          <Route path="/ResetPassword" component={ResetPassword} />
          <Route exact path="/AdminAfterSign" component={AdminAfterSign} />
          <Route exact path="/PropMana" component={PropManaAfterSign} />
          <Route exact path="/PropMana/:sub" component={PropManaAfterSign} />
          <Route exact path="/PropMana/:sub/property" component={PropManaAfterSign} />
          <Route exact path="/PropMana/:sub/property/:propertyId" component={PropManaAfterSign} />
          <Route exact path="/PropMana/:sub/property/:propertyId/invoice_history" component={PropManaAfterSign} />
          <Route exact path="/PropMana/:sub/user_info" component={PropManaAfterSign} />
          <Route exact path="/PropMana/:sub/property/:propertyId/utility_bill" component={PropManaAfterSign} />
          <Route exact path="/PropMana/:sub/property/:propertyId/IndividualTenantInvoice" component={IndividualTenantInvoice} />
          <Route path="/RegProcess" component={RegProcess} />
          <Route path="/ResetProcess" component={ResetProcess} />
          <Route path="/ApplicationStatus" component={ApplicationStatus} />
          <Route path="/ManaInfo" component={ManaInfo} />
          <Route path="/EditUserAccount" component={EditUserAccount} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
