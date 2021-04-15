import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./LoginPage.js";
import SignUpPage from "./SignUpPage.js";
import Navigation from "./Navigation.js";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { DialogContent, FormControl } from "@material-ui/core";

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <Paper elevation={24}>
              <Typography component="h1" variant="h1" color="primary">
                PropTech
              </Typography>
              <DialogContent />
              <Divider />
              <Divider />
              <Divider />
              <DialogContent />
              <DialogContent />
              <div className="buttons">
                <table>
                  <thead>
                    <tr>
                      <th>
                        <Paper>
                          <Button color="primary" style={{ fontSize: 15 }} className="button" onClick={login}>
                            Login
                          </Button>
                        </Paper>
                      </th>
                      <th>
                        <Paper>
                          <Button color="primary" style={{ fontSize: 15 }} className="button" onClick={signup}>
                            Sign Up
                          </Button>
                        </Paper>
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
            </Paper>
          </header>
        </div>
      </div>
    );
  }
}

function login() {
  window.location = "/LoginPage";
}
function signup() {
  window.location = "/SignUpPage";
}

export default HomePage;
