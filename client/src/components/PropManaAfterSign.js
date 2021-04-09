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
<<<<<<< HEAD
import Typography from "@material-ui/core/Typography";
=======

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
>>>>>>> origin/Front-end
import { DialogContent } from "@material-ui/core";
import InvoiceHistory from "./InvoiceHistory";
import UserProfile from "./UserProfile";

class PropManaAfterSign extends Component {
  constructor(props) {
    super(props);
    var page;
<<<<<<< HEAD
    if (matchPath(this.props.location.pathname, { path: "/PropMana/:sub/user_info", exact: true, strict: false })) {
      page = "user_info";
    } else if (matchPath(this.props.location.pathname, { path: "/PropMana/:sub/property", exact: true, strict: false })) {
      page = "property";
    } else if (matchPath(this.props.location.pathname, { path: "/PropMana/:sub/property/:propertyId", exact: true, strict: false })) {
      page = "tenant";
    } else if (matchPath(this.props.location.pathname, { path: "/PropMana/:sub/invoiceHistory", exact: true, strict: false })) {
      page = "invoice";
=======
    if (matchPath(this.props.location.pathname, { path: "/PropMana/:sub/property", exact: true, strict: false })) {
      page = "property";
    } else if (matchPath(this.props.location.pathname, { path: "/PropMana/:sub/property/:propertyId", exact: true, strict: false })) {
      page = "tenant";
>>>>>>> origin/Front-end
    }
    this.state = {
      sub: this.props.match.params.sub,
      page: (() => {
        switch (page) {
<<<<<<< HEAD
          case "user_info":
            return <UserProfile display={this} />;
          case "property":
            return <PropertyInfo display={this} />;
          case "tenant":
            return <TenantInfo display={this} property_id={this.props.match.params.propertyId} />;
          case "invoice":
            return <InvoiceHistory display={this} />;
=======
          case "property":
            return <PropertyInfo display={this} />;
          case "tenant":
            return <TenantInfo display={this} />;
>>>>>>> origin/Front-end
        }
      })(),
      page_name: (() => {
        switch (page) {
<<<<<<< HEAD
          case "user_info":
            return sessionStorage.getItem("username") + " Profile";
=======
>>>>>>> origin/Front-end
          case "property":
            return sessionStorage.getItem("username") + " Properties";
          case "tenant":
            return sessionStorage.getItem("property_name") + " Information";
<<<<<<< HEAD
          case "invoice":
            return sessionStorage.getItem("property_name") + " Invoices";
=======
>>>>>>> origin/Front-end
        }
      })(),
      pathname: this.props.location.pathname,
      menu_display_more_options: (() => {
        switch (page) {
<<<<<<< HEAD
          case "user_info":
            return false;
=======
>>>>>>> origin/Front-end
          case "property":
            return false;
          case "tenant":
            return true;
<<<<<<< HEAD
          case "invoice":
            return true;
        }
      })(),
      property_id: this.props.match.params.propertyId,
=======
        }
      })(),
>>>>>>> origin/Front-end
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
<<<<<<< HEAD
          <SideMenu page={this} display_more_options={this.state.menu_display_more_options} property_id={this.state.property_id} />
=======
          <SideMenu page={this} display_more_options={this.state.menu_display_more_options} />
>>>>>>> origin/Front-end
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