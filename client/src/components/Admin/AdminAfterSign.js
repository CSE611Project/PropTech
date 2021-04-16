import React from "react";
import { Component } from "react";
import "./../../App.css";
import AdminManageUsers from "./AdminManageUsers";
import AdminSideMenu from "./AdminSideMenu";
import { matchPath } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { DialogContent } from "@material-ui/core";

class AdminAfterSign extends Component {
  constructor(props) {
    super(props);
    var page;
    if (matchPath(this.props.location.pathname, { path: "/Admin/propertyManagers", exact: true, strict: false })) {
      page = "manage_users";
    }
    this.state = {
      page: (() => {
        switch (page) {
          case "manage_users":
            return <AdminManageUsers display={this} />;
        }
      })(),
      page_name: (() => {
        switch (page) {
          case "manage_users":
            return "Manage Users";
        }
      })(),
    };
  }
  render() {
    return (
      <div className="topOffset leftOffset">
        <Typography component="h1" variant="h5" color="primary">
          {this.state.page_name}
        </Typography>
        <DialogContent />
        <div className="Info_Page_Split">
          <AdminSideMenu />
          <div className="display">{this.state.page}</div>
        </div>
      </div>
    );
  }
}

export default AdminAfterSign;
