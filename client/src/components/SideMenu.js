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
    this.state = { display_more_options: this.props.display_more_options, is_admin: this.props.is_admin, property_id: this.props.property_id };
  }

  render() {
    return (
      <div className="sidenav">
        <header>
          <ul>
            <a href="#" onClick={this.manage_property}>
              Manage Property Info
            </a>
            {this.state.is_admin ? null : (
              <a href="#" onClick={this.edit_profile}>
                Edit Profile Info
              </a>
            )}
            {this.state.display_more_options ? (
              <div>
                <a href="#" onClick={this.manage_utility}>
                  Manage Utility Bill
                </a>
                <a href="#" onClick={this.manage_invoice}>
                  Manage Invoice History
                </a>
                <GenerateInvoice property_id={this.state.property_id} />
              </div>
            ) : null}
            <a href="#" onClick={this.log_out}>
              Log Out
            </a>
            {this.state.is_admin ? (
              <a href="#" onClick={this.manage_users}>
                Manage Users
              </a>
            ) : null}
          </ul>
        </header>
      </div>
    );
  }

  manage_property = () => {
    if (this.state.is_admin == true) {
      window.location = `/Admin/PropMana/${sessionStorage.getItem("sub")}/property`;
    } else {
      window.location = `/PropMana/${sessionStorage.getItem("sub")}/property`;
    }
  };

  edit_profile = () => {
    if (this.state.is_admin == true) {
      window.location = `/Admin/PropMana/${sessionStorage.getItem("sub")}/user_info`;
    } else {
      window.location = `/PropMana/${sessionStorage.getItem("sub")}/user_info`;
    }
  };

  manage_utility = () => {
    //
  };

  manage_invoice = () => {
    if (this.state.is_admin == true) {
      window.location = `/Admin/PropMana/${sessionStorage.getItem("sub")}/invoiceHistory`;
    } else {
      window.location = `/PropMana/${sessionStorage.getItem("sub")}/invoiceHistory`;
    }
  };

  manage_users = () => {
    window.location = "/Admin/propertyManagers";
  };

  log_out = () => {
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
  };
}
export default SideMenu;
