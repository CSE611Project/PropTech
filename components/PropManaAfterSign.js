import React from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import Navigation from "./Navigation.js"
import HomePage from "./HomePage.js"
import TenantInfo from "./TenantInfo.js"


class PropManaAfterSign extends React.Component {
  render() {
    return (
      <div>
        <div className="AdminAfterSign">
          <header className="Admin_menu">
            <h1>Tenants information</h1>
            <ul className="buttonUL">
              <button className="Admin_option" onClick={manage_tenant}>Manage Tenant Info</button>
              <button className="Admin_option" onClick={manage_property}>Manage Property Info</button>
              <button className="Admin_option" onClick={edit_profile}>Edit Profile Info</button>
              <button className="Admin_option" onClick={manage_utility}>Manage Utility Bill</button>
              <button className="Admin_option" onClick={manage_invoice}>Manage Invoice History</button>
              <button className="Admin_option" onClick={generate_invoice}>Generate Invoice</button>
              <button className="Admin_option" onClick={log_out}>Log Out</button>
            </ul>
          </header>
        </div>
      </div>
    );
  }
}

function manage_tenant() {
  const ele =
    <div>
      <TenantInfo />
    </div>
    window.location = "/PropManaAfterSign/TenantInfo"
  return (ReactDOM.render(ele, document.getElementById('root')));
}

function manage_property() {
  const ele =
    <div>

    </div>
  return (ReactDOM.render(ele, document.getElementById('root')));
}

function edit_profile() {
  const ele =
    <div>

    </div>
  return (ReactDOM.render(ele, document.getElementById('root')));
}

function manage_utility() {
  const ele =
    <div>

    </div>
  return (ReactDOM.render(ele, document.getElementById('root')));
}

function manage_invoice() {
  const ele =
    <div>

    </div>
  return (ReactDOM.render(ele, document.getElementById('root')));
}

function generate_invoice() {
  const ele =
    <div>

    </div>
  return (ReactDOM.render(ele, document.getElementById('root')));
}

function log_out() {
  const ele =
    <div>
      <div className="Admin_menu" id="logout">
        <header className="RegProcess-header">
          <h1>You have successfully logout</h1>
          <button className="button" onClick={homepage}>OK</button>
        </header>
      </div>
    </div>
  return (ReactDOM.render(ele, document.getElementById('root')));
}

function homepage() {
  window.location = "/"
  return (ReactDOM.render(<HomePage />, document.getElementById('root')));
}

function back() {
  return (ReactDOM.render(<PropManaAfterSign />, document.getElementById('root')));
}

export default PropManaAfterSign;
