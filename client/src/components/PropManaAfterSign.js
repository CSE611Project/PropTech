import React from "react";
import { Component } from "react";
import ReactDOM from "react-dom";
import { matchPath } from "react-router-dom";
import "./../App.css";
import Navigation from "./Navigation.js";
import HomePage from "./HomePage.js";
import TenantInfo from "./TenantInfo.js";
import PropertyInfo from "./PropertyInfo.js";
import SideMenu from "./SideMenu.js";
import Typography from "@material-ui/core/Typography";
import { DialogContent } from "@material-ui/core";
import InvoiceHistory from "./InvoiceHistory";
import UserProfile from "./UserProfile";

class PropManaAfterSign extends Component {
  constructor(props) {
    super(props);
    var page;
    var user_type;
    if (
      matchPath(this.props.location.pathname, { path: "/PropMana/:sub/user_info", exact: true, strict: false }) ||
      matchPath(this.props.location.pathname, { path: "/Admin/PropMana/:sub/user_info", exact: true, strict: false })
    ) {
      sessionStorage.setItem("sub", this.props.match.params.sub);
      page = "user_info";
    } else if (
      matchPath(this.props.location.pathname, { path: "/PropMana/:sub/property", exact: true, strict: false }) ||
      matchPath(this.props.location.pathname, { path: "/Admin/PropMana/:sub/property", exact: true, strict: false })
    ) {
      sessionStorage.setItem("sub", this.props.match.params.sub);
      page = "property";
    } else if (
      matchPath(this.props.location.pathname, { path: "/PropMana/:sub/property/:propertyId", exact: true, strict: false }) ||
      matchPath(this.props.location.pathname, { path: "/Admin/PropMana/:sub/property/:propertyId", exact: true, strict: false })
    ) {
      sessionStorage.setItem("property_id", this.props.match.params.propertyId);
      sessionStorage.setItem("sub", this.props.match.params.sub);
      page = "tenant";
    } else if (
      matchPath(this.props.location.pathname, { path: "/PropMana/:sub/invoiceHistory", exact: true, strict: false }) ||
      matchPath(this.props.location.pathname, { path: "/Admin/PropMana/:sub/invoiceHistory", exact: true, strict: false })
    ) {
      sessionStorage.setItem("sub", this.props.match.params.sub);
      page = "invoice";
    } else {
      sessionStorage.setItem("sub", this.props.match.params.sub);
    }
    if (matchPath(this.props.location.pathname, { path: "/Admin", exact: false })) {
      user_type = "Admin";
    } else {
      user_type = "PropMana";
    }
    this.state = {
      sub: this.props.match.params.sub,
      page: (() => {
        switch (page) {
          case "property":
            return <PropertyInfo display={this} />;
          case "tenant":
            return <TenantInfo display={this} />;
        }
      })(),
      page_name: (() => {
        switch (page) {
          case "property":
            return sessionStorage.getItem("username") + " Properties";
          case "tenant":
            return sessionStorage.getItem("property_name") + " Information";
        }
      })(),
      pathname: this.props.location.pathname,
      menu_display_more_options: (() => {
        switch (page) {
          case "property":
            return false;
          case "tenant":
            return true;
        }
      })(),
      is_admin: (() => {
        switch (user_type) {
          case "Admin":
            return true;
          case "PropMana":
            return false;
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
          <SideMenu page={this} display_more_options={this.state.menu_display_more_options} is_admin={this.state.is_admin} />
          <div className="display">{this.state.page}</div>
        </div>
      </div>
    );
  }
}

function back() {
  return ReactDOM.render(<PropManaAfterSign />, document.getElementById("root"));
}

export default PropManaAfterSign;
