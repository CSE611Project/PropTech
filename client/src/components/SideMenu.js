import React from "react";
import { Component } from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import GenerateInvoice from "./GenerateInvoice";
import axios from "axios";
import { config } from "aws-sdk";

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { display_more_options: this.props.display_more_options, property_id: this.props.property_id };
  }

  render() {
    return (
      <div className="sidenav">
        <header>
          <ul>
            <a href="#" onClick={manage_property}>
              Manage Property Info
            </a>
            <a href="#" onClick={edit_profile}>
              Edit Profile Info
            </a>
            {this.state.display_more_options ? (
              <div>
                <a href="#" onClick={manage_utility}>
                  Manage Utility Bill
                </a>
                <a href="#" onClick={manage_invoice}>
                  Manage Invoice History
                </a>
                <GenerateInvoice property_id={this.state.property_id} />
              </div>
            ) : null}
            <a href="#" onClick={log_out}>
              Log Out
            </a>
          </ul>
        </header>
      </div>
    );
  }
}

function manage_property() {
  window.location = `/PropMana/${sessionStorage.getItem("sub")}/property`;
}

function edit_profile() {
  window.location = `/PropMana/${sessionStorage.getItem("sub")}/user_info`;
}

function manage_utility() {
  const ele = <div></div>;
  return ReactDOM.render(ele, document.getElementById("root"));
}

function manage_invoice() {
  window.location = `/PropMana/${sessionStorage.getItem("sub")}/invoiceHistory`;
}

function log_out() {
  sessionStorage.removeItem("sub");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("property_id");
  sessionStorage.removeItem("property_name");
  sessionStorage.removeItem("custom:state");
  sessionStorage.removeItem("custom:company_name");
  sessionStorage.removeItem("custom:city");
  sessionStorage.removeItem("custom:zipcode");
  sessionStorage.removeItem("custom:street_name");
  sessionStorage.removeItem("custom:suite_number");
  sessionStorage.removeItem("accessToken");
  axios.post("/logout", {}, { withCredentials: true, credentials: "include" }).then((response) => {
    window.location = "/";
  });
}
export default SideMenu;
