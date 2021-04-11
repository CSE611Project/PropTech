import React from "react";
import { Component } from "react";
import ReactDOM from "react-dom";
import "./../../App.css";
import GenerateInvoice from "./../GenerateInvoice";
import axios from "axios";
import { de } from "date-fns/locale";

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
            <a href="#" onClick={log_out}>
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

function log_out() {
  axios.post("/logout");
  window.location = "/";
}

export default AdminSideMenu;
