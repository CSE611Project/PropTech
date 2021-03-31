import React from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import LoginPage from "./LoginPage.js";
import Navigation from "./Navigation.js"

class ResetProcess extends React.Component {
  render() {
    return (
      <div>
        <div className="ResetProcess">
          <header className="Login-header">
            <h1>You have successfully reset your password!</h1>
            <button className="button" onClick={back}>Ok</button>
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
