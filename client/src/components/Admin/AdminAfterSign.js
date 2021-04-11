import React from "react";
import { Component } from "react";
import ReactDOM from "react-dom";
import "./../../App.css";
import AdminManageUsers from "./AdminManageUsers";
import { matchPath } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { DialogContent } from "@material-ui/core";
import AdminSideMenu from "./AdminSideMenu";

import TableCell from "@material-ui/core/TableCell";

class PropManaAfterSign extends Component {
  constructor(props) {
    super(props);
    var page;
    if (matchPath(this.props.location.pathname, { path: "/Admin/propertyManagers", exact: true, strict: false })) {
      page = "manage_users";
    }
    this.state = {
      // sub: this.props.match.params.sub,
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
      pathname: this.props.location.pathname,
      // property_id: null,
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
          <AdminSideMenu page={this} display_more_options={this.state.menu_display_more_options} property_id={this.state.property_id} />
          <div className="display">{this.state.page}</div>
        </div>
      </div>
    );
  }
}

export default PropManaAfterSign;
