import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Navigation.css";
import HomePage from "./HomePage.js";
import Abouts from "./About.js";
import { BrowserRouter } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

class Navigation extends React.Component {
  render() {
    return (
      <div>
        <AppBar position="absolute">
          <Toolbar>
            <Grid
              justify="space-between"
              container
              spacing={24}
            >
              <Grid item>
                <Typography component="h1" variant="h4" color="inherit" noWrap >
                  PropTech
                </Typography>
              </Grid>
              <Grid item>
                <ul>
                  <Link href="/" onClick={home}>
                    <li>Home</li>
                  </Link>
                  <Link href="/About" onClick={about}>
                    <li>About</li>
                  </Link>
                </ul>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

function home() {
  return ReactDOM.render(<HomePage />, document.getElementById("root"));
}

function about() {
  return ReactDOM.render(<Abouts />, document.getElementById("root"));
}

export default Navigation;
