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

class PropManaAfterSign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sub: this.props.match.params.sub,
      page: null,
      page_name: null,
      pathname: this.props.location.pathname,
    };
  }

  componentDidMount() {
    if (matchPath(this.state.pathname, { path: "/PropMana/:sub/property", exact: true, strict: false })) {
      this.setState({ page_name: sessionStorage.getItem("username") + " Properties" });
      this.manage_property();
    } else if (matchPath(this.state.pathname, { path: "/PropMana/:sub/property/:propertyId", exact: true, strict: false })) {
      this.setState({ page_name: sessionStorage.getItem("property_name") + " Information" });
      this.manage_tenant(this.props.match.params.propertyId);
    }
  }

  manage_property = () => {
    this.setState({ page: <PropertyInfo display={this} /> });
  };

  manage_tenant = (property_id) => {
    this.setState({ page: <TenantInfo display={this} property_id={property_id} /> });
  };

  render() {
    return (
      <div>
        <Typography component="h1" variant="h5" color="primary">
          {this.state.page_name}
        </Typography>
        <DialogContent />
        <div className="Info_Page_Split">
          <SideMenu page={this} />
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
