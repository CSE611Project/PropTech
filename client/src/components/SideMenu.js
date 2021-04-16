
import React from "react";
import { Component } from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import Cookies from "js-cookie";
import TenantInfo from "./TenantInfo"
import BillingHistory from "./BillingHistory"
import UtilityBillMeter from "./UtilityBillMeter"
import UtilityBillSubmeter from "./UtilityBillSubmeter"
import GenerateInvoice from "./GenerateInvoice"

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
import axios from "axios";

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { display_more_options: this.props.display_more_options, property_id: this.props.property_id };
  }

  render() {
    return (
      <div className="sidenav">
        <header>
          <ul>
            <a href="#" onClick={manage_property}>
              Manage Property Info
            </a>
            <a href="#" onClick={edit_profile}>
              Edit Profile Info
            </a>
            {this.state.display_more_options ? (
              <div>
                <a href="#" onClick={manage_utility}>
                  Manage Utility Bill
                </a>
                <a href="#" onClick={manage_invoice}>
                  Manage Invoice History
                </a>
                <GenerateInvoice property_id={this.state.property_id} />
              </div>
            ) : null}
            <a href="#" onClick={log_out}>
              Log Out
            </a>
          </ul>
        </header>
      </div>
    );
  }
}

function manage_property() {
  window.location = `/PropMana/${sessionStorage.getItem("sub")}/property`;
}

function edit_profile() {
  window.location = `/PropMana/${sessionStorage.getItem("sub")}/user_info`;
}

function manage_utility() {
  window.location = `/PropMana/${sessionStorage.getItem("sub")}/property/${sessionStorage.getItem("property_id")}/utility_bill`;
}

function manage_invoice() {
  window.location = `/PropMana/${sessionStorage.getItem("sub")}/property/${sessionStorage.getItem("property_id")}/invoice_history`;
}

function log_out() {
  sessionStorage.removeItem("sub");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("property_id");
  sessionStorage.removeItem("property_name");
  sessionStorage.removeItem("custom:state");
  sessionStorage.removeItem("custom:company_name");
  sessionStorage.removeItem("custom:city");
  sessionStorage.removeItem("custom:zipcode");
  sessionStorage.removeItem("custom:street_name");
  sessionStorage.removeItem("custom:suite_number");
  sessionStorage.removeItem("accessToken");
  axios.post("/logout");
  window.location = "/";
}

function homepage() {
  //   window.location = "/";
  //   return ReactDOM.render(<HomePage />, document.getElementById("root"));
}

export default SideMenu;