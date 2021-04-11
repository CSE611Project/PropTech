import React from "react";
import { Component } from "react";
import ReactDOM from "react-dom";
import "./../../App.css";
import GenerateInvoice from "./../GenerateInvoice";
import axios from "axios";
import { de } from "date-fns/locale";
import { Route53Resolver } from "aws-sdk";

class AdminSideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="sidenav">
        <header>
          <ul>
            <a href="#" onClick={manage_users}>
              Manage Users
            </a>
            <a href="#" onClick={log_out}>
              Log Out
            </a>
          </ul>
        </header>
      </div>
    );
  }
}

function manage_users() {
  window.location = "/Admin/propertyManagers";
}

function log_out() {
  sessionStorage.removeItem("accessToken");
  axios.post("/logout").then((response) => {
    window.location = "/";
  });
}

export default AdminSideMenu;
