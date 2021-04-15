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
import InvoiceHistory from "./InvoiceHistory.js"
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { DialogContent } from "@material-ui/core";
import UserProfile from "./UserProfile";
import UtilityBillingHistory from "./UtilityBillingHistory";

class PropManaAfterSign extends Component {
  constructor(props) {
    super(props);
    var page;
    if (matchPath(this.props.location.pathname, { path: "/PropMana/:sub/property", exact: true, strict: false })) {
      page = "property";
    } else if (matchPath(this.props.location.pathname, { path: "/PropMana/:sub/property/:propertyId", exact: true, strict: false })) {
      page = "tenant";
    } else if (matchPath(this.props.location.pathname, { path: "/PropMana/:sub/property/:propertyId/invoice_history", exact: true, strict: false })) {
      page = "invoicehistory";
    } else if (matchPath(this.props.location.pathname, { path: "/PropMana/:sub/property/:propertyId/utility_bill", exact: true, strict: false })) {
      page = "utilitybill";
    }
    this.state = {
      sub: this.props.match.params.sub,
      page: (() => {
        switch (page) {
          case "property":
            return <PropertyInfo display={this} />;
          case "tenant":
            return <TenantInfo display={this} />;
          case "invoicehistory":
            return <InvoiceHistory display={this} property_id={sessionStorage.getItem("property_id")} tenant_list={this.tenant_list} />;
          case "utilitybill":
            return <UtilityBillingHistory display={this} property_id={sessionStorage.getItem("property_id")} tenant_list={this.tenant_list} />;
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
          case "invoicehistory":
            return true;
          case "utilitybill":
            return true;
        }
      })(),
    };

    this.getTenantList = this.getTenantList.bind(this);

  }

  getTenantList() {
    let tenant_list = [];
    return new Promise((resolve, reject) => {
      axios.get(`/tenant/${this.state.property_id}`).then((response) => {
        tenant_list = response.data;
        resolve();
      });
      this.tenant_list = tenant_list;
    });
  }

  render() {
    return (
      <div className="topOffset leftOffset">
        <Typography component="h1" variant="h5" color="primary">
          {this.state.page_name}
        </Typography>
        <DialogContent />
        <div className="Info_Page_Split">
          <SideMenu page={this} display_more_options={this.state.menu_display_more_options} />
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