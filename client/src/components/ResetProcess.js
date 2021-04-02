import React from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import LoginPage from "./LoginPage.js";
import Navigation from "./Navigation.js"
import Button from '@material-ui/core/Button';
import { Typography } from "@material-ui/core";

class ResetProcess extends React.Component {
  render() {
    return (
      <div>
        <div className="ResetProcess">
          <header className="Login-header">
          <Typography component="h1" variant="h5" color="primary" >You have successfully reset your password!</Typography>
            <Button color="primary" onClick={back}>Ok</Button>
          </header>
        </div>
      </div>
    );
  }
}

function back() {
  window.location = "/LoginPage"
  return (ReactDOM.render(<LoginPage />, document.getElementById('root')));
}

export default ResetProcess;
