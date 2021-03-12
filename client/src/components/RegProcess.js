import React from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import HomePage from "./HomePage.js";
import Navigation from "./Navigation.js"

class RegProcess extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="RegProcess">
          <header className="RegProcess-header">
            <h1>Thank you, you will recieve an email about your registration result shortly.</h1>
            <button className="button" onClick={back}>Ok</button>
          </header>
        </div>
      </div>
    );
  }
}

function back() {
  return (ReactDOM.render(<HomePage />, document.getElementById('root')));
}

export default RegProcess;
