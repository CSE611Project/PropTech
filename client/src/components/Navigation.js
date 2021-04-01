import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Navigation.css";
import HomePage from "./HomePage.js";
import Abouts from "./About.js";
import { BrowserRouter, Link } from "react-router-dom";

class Navigation extends React.Component {
  render() {
    return (
      <nav className="Navigation">
        <ul>
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/About"}>
            <li>About</li>
          </Link>
        </ul>
      </nav>
    );
  }
}

function home() {
  return ReactDOM.render(<HomePage />, document.getElementById("root"));
}

function about() {
  return ReactDOM.render(<Abouts />, document.getElementById("root"));
}

export default Navigation;
