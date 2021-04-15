import React from "react";
import { Component } from "react";
import ReactDOM from "react-dom";
import "./../../App.css";
import axios from "axios";

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
  axios.post("/logout", {}, { withCredentials: true, credentials: "include" }).then((response) => {
    window.location = "/";
  });
}

export default AdminSideMenu;
