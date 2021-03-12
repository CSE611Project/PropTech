import React from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import Navigation from "./Navigation.js"
import HomePage from "./HomePage.js"


class AdminAfterSign extends React.Component{
    render(){
        return(
            <div>
              <Navigation />
              <div className = "AdminAfterSign">
                <header className = "Admin_menu">
                    <h1>What can I do for you today ?</h1>
                    <ul className = "buttonUL">
                    <button className ="Admin_option" onClick = {edit_user_account}>Edit Users Account</button>
                    <button className ="Admin_option" onClick = {view_managers}>Building Managers Information</button>
                    <button className ="Admin_option" onClick = {view_account_application}>Account Application Status</button>
                    <button className ="Admin_option" onClick = {log_out}>Log Out</button>
                    </ul>
                </header>
              </div>
            </div>
        );
    }
}

function edit_user_account (){
    const ele =
    <div>
      <Navigation />
    </div>
    return (ReactDOM.render(ele, document.getElementById('root')));
}

function view_managers (){
    const ele =
    <div>
      <Navigation />
    </div>
    return (ReactDOM.render(ele, document.getElementById('root')));
}

function view_account_application(){
    const ele =
    <div>
      <Navigation />
    </div>
    return (ReactDOM.render(ele, document.getElementById('root')));
}

function log_out(){
    const ele =
    <div>
      <Navigation />
        <div className = "Admin_menu" id = "logout">
        <header className = "Admin_menu">
            <h1>You have successfully logout</h1>
            <button className="button" onClick={homepage}>OK</button>
        </header>
        </div>
    </div>
    return (ReactDOM.render(ele, document.getElementById('root')));
}

function homepage() {
  return (ReactDOM.render(<HomePage />, document.getElementById('root')));
}

export default AdminAfterSign;
