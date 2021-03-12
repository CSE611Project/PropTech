import React from "react";
import ReactDOM from 'react-dom';
import "./Navigation.css"
import HomePage from "./HomePage.js"
import Abouts from "./About.js"

class Navigation extends React.Component {
  render () {
    return (
      <nav className="Navigation">
        <ul>
          <li>
            <button className="navButton" onClick={home}>Home</button>
          </li>
          <li>
            <button href="About" className="navButton" onClick={about}>About</button>
          </li>
        </ul>
      </nav>
    );
  }
}

function home() {
  return (ReactDOM.render(<HomePage />, document.getElementById('root')));
}

function about() {
  return (ReactDOM.render(<Abouts />, document.getElementById('root')));
}

export default Navigation;
