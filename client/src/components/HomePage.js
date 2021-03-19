import React from "react";
import ReactDOM from 'react-dom';
import LoginPage from "./LoginPage.js";
import SignUpPage from "./SignUpPage.js";
import Navigation from "./Navigation.js";

class HomePage extends React.Component {
  render() {
    return(
      <div>
        <div className="App">
          <header className="App-header">
            <h1>PropTech</h1>
            <div className="buttons">
              <button className="button" onClick={login}>Login</button>
              <button className="button" onClick={signup}>Sign Up</button>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

function login() {
  window.location = '/LoginPage'
  return (ReactDOM.render(<LoginPage />, document.getElementById('root')));
}
function signup() {
  window.location = '/SignUpPage'
  return (ReactDOM.render(<SignUpPage />, document.getElementById('root')));
}

export default HomePage;
