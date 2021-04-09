import React from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import Navigation from "./Navigation.js";
import ResetProcess from "./ResetProcess.js";
import { cognito, userPool } from "./UserPool";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      dialog_open: false,
      dialog_text: "An email has been sent with a verification code",
    };
  }

  changeUsername = (event) => {
    this.setState({ username: event.target.value });
  };
  handleDialogClose = () => {
    window.location = "/ResetProcess";
  };

  resetPassword = () => {
    var cognitoUser = new cognito.CognitoUser({
      Username: this.state.username,
      Pool: userPool,
    });
    console.log(this.state.username);

    cognitoUser.forgotPassword({
      onSuccess: function (result) {},
      onFailure: function (err) {},
    });
    this.setState({ dialog_open: true });
  };

  render() {
    return (
      <div className="ResetPassword">
        <header className="Login-header">
          <Typography component="h1" variant="h4" color="primary">
            Reset Password
          </Typography>
          <TextField autoFocus margin="dense" id="username" label="Enter your username" onChange={this.changeUsername} value={this.state.username} />
          <Button color="primary" onClick={this.resetPassword}>
            Reset
          </Button>
          <Dialog open={this.state.dialog_open} onClose={this.handleDialogClose} aria-labelledby="form-dialog-title">
            <DialogContent>
              <DialogContentText></DialogContentText>
              {this.state.dialog_text}
              <Button onClick={this.handleDialogClose} color="primary">
                OK
              </Button>
            </DialogContent>
          </Dialog>
        </header>
      </div>
    );
  }
}

export default ResetPassword;
