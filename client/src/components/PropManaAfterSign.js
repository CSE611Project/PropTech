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
import InvoiceHistory_m from "./InvoiceHistory_m";

class PropManaAfterSign extends Component {
  constructor(props) {
    super(props);
    var page;
    if (matchPath(this.props.location.pathname, { path: "/PropMana/:sub/property", exact: true, strict: false })) {
      page = "property";
    } else if (matchPath(this.props.location.pathname, { path: "/PropMana/:sub/property/:propertyId", exact: true, strict: false })) {
      page = "tenant";
    } else if (matchPath(this.props.location.pathname, { path: "/PropMana/:sub/invoiceHistory", exact: true, strict: false })) {
      page = "invoice";
    }
    this.state = {
      sub: this.props.match.params.sub,
      page: (() => {
        switch (page) {
          case "property":
            return <PropertyInfo display={this} />;
          case "tenant":
            return <TenantInfo display={this} property_id={this.props.match.params.propertyId} />;
          case "invoice":
            return <InvoiceHistory display={this} />;
        }
      })(),
      page_name: (() => {
        switch (page) {
          case "property":
            return sessionStorage.getItem("username") + " Properties";
          case "tenant":
            return sessionStorage.getItem("property_name") + " Information";
          case "invoice":
            return sessionStorage.getItem("property_name") + " Invoices";
        }
      })(),
      pathname: this.props.location.pathname,
      menu_display_more_options: (() => {
        switch (page) {
          case "property":
            return false;
          case "tenant":
            return true;
          case "invoice":
            return true;
        }
      })(),
      property_id: this.props.match.params.propertyId,
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
          <SideMenu page={this} display_more_options={this.state.menu_display_more_options} property_id={this.state.property_id} />
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
