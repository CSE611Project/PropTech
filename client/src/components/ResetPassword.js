import React from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import Navigation from "./Navigation.js";
import ResetProcess from "./ResetProcess.js";
import { cognito, userPool } from "./UserPool";

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
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { DialogContent, FormControl } from "@material-ui/core";

class ResetPassword extends React.Component {
  render() {
    return (
      <div>
        <div className="ResetPassword">
          <header className="Login-header">
            <Typography component="h1" variant="h4" color="primary" >
              Reset Password
            </Typography>
            {/*<label>Enter your old password:</label>
            <input type="password" />
            <label>Enter your new password:</label>
            <input type="password" />
            <label>Confirm your new password:</label>
            <input type="password" />*/}
            <TextField
                  autoFocus
                  margin="dense"
                  label="Enter your old password"
                  type="password"
            />
            <TextField
                  autoFocus
                  margin="dense"
                  label="Enter your new password"
                  type="password"
            />
            <TextField
                  autoFocus
                  margin="dense"
                  label="Confirm new password"
                  type="password"
            />
            <Button color="primary" onClick={reset}>
              Reset
            </Button>
          </header>
        </div>
      </div>
    );
  }
}

function reset() {
  window.location = "/ResetProcess";
  return ReactDOM.render(<ResetProcess />, document.getElementById("root"));
}

function resetPassword(username) {
  var cognitoUser = new cognito.CognitoUser({
    Username: username,
    Pool: userPool,
  });

  cognitoUser.forgotPassword({
    onSuccess: function (result) {
      console.log("call result: " + result);
    },
    onFailure: function (err) {
      alert(err);
    },
  });
}

function confirmPassword(username, verificationCode, newPassword) {
  var cognitoUser = new cognito.CognitoUser({
    Username: username,
    Pool: userPool,
  });

  return new Promise((resolve, reject) => {
    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onFailure(err) {
        reject(err);
      },
      onSuccess() {
        resolve();
      },
    });
  });
}

export default ResetPassword;
