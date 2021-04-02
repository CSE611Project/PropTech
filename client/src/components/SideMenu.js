import React from "react";
import { Component } from "react";
import ReactDOM from "react-dom";
import PropManaAfterSign from "./PropManaAfterSign.js";
import "./../App.css";

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Paper elevation={2}>
          <Button color="primary" onClick={manage_property}>
            Manage Property
          </Button>
          <Divider />
          <Divider />
          <Button color="primary" onClick={edit_profile}>
            Edit Profile Info
          </Button>
          <Divider />
          <Divider />
          <Button color="primary" onClick={manage_utility}>
            Manage Utility Bill
          </Button>
          <Divider />
          <Divider />
          <Button color="primary" onClick={manage_invoice}>
            Invoice History
          </Button>
          <Divider />
          <Divider />
          <Button color="primary" onClick={generate_invoice}>
            Generate Invoice
          </Button>
          <Divider />
          <Divider />
          <Button color="primary" onClick={log_out}>
            Log Out
          </Button>
          </Paper>
        </Grid>
      </div>
    );
  }
}

function manage_property() {
  window.location = `/PropMana/${sessionStorage.getItem("sub")}/property`;
}

function edit_profile() {
  const ele = <div></div>;
  return ReactDOM.render(ele, document.getElementById("root"));
}

function manage_utility() {
  const ele = <div></div>;
  return ReactDOM.render(ele, document.getElementById("root"));
}

function manage_invoice() {
  const ele = <div></div>;
  return ReactDOM.render(ele, document.getElementById("root"));
}

function generate_invoice() {
  const ele = <div></div>;
  return ReactDOM.render(ele, document.getElementById("root"));
}

function log_out() {
  //   const ele = (
  //     <div>
  //       <div className="PropMana_menu" id="logout">
  //         <header className="RegProcess-header">
  //           <h1>You have successfully logout</h1>
  //           <button className="button" onClick={homepage}>
  //             OK
  //           </button>
  //         </header>
  //       </div>
  //     </div>
  //   );
  //   return ReactDOM.render(ele, document.getElementById("root"));
}

function homepage() {
  //   window.location = "/";
  //   return ReactDOM.render(<HomePage />, document.getElementById("root"));
}

export default SideMenu;
