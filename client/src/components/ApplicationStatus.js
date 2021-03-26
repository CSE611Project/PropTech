import React from "react";
import ReactDOM from 'react-dom';
import "./../App.css";
import Navigation from "./Navigation.js"
import HomePage from "./HomePage.js"
import ManaInfo from "./ManaInfo"
import EditUserAccount from "./EditUserAccount"

class ApplicationStatus extends React.Component {
    render() {
        return (
            <div>
                <div className="AdminAfterSign">
                    <header className="Admin_menu">
                        <h1>Account Application Status</h1>
                        <ul className="buttonUL">
                            <button className="Admin_option" onClick={edit_user_account}>Edit Users Account</button>
                            <button className="Admin_option" onClick={view_managers}>Building Managers Information</button>
                            <button className="Admin_option" onClick={view_account_application}>Account Application Status</button>
                            <button className="Admin_option" onClick={log_out}>Log Out</button>
                        </ul>
                    </header>
                </div>
            </div>
        );
    }
}

function edit_user_account() {
    const ele =
        <div>
            <EditUserAccount />
        </div>
    window.location = "/EditUserAccount"
    return (ReactDOM.render(ele, document.getElementById('root')));
}

function view_managers() {
    const ele =
        <div>
            <ManaInfo />
        </div>
    window.location = "/ManaInfo";
    return (ReactDOM.render(ele, document.getElementById('root')));
}

function view_account_application() {
    const ele =
        <div>
            <ApplicationStatus />
        </div>
    window.location = "/ApplicationStatus";
    return (ReactDOM.render(ele, document.getElementById('root')));
}

function log_out() {
    const ele =
        <div>
            <div className="Admin_menu" id="logout">
                <header className="RegProcess-header">
                    <h1>You have successfully logout</h1>
                    <button className="button" onClick={homepage}>OK</button>
                </header>
            </div>
        </div>
    return (ReactDOM.render(ele, document.getElementById('root')));
}

function homepage() {
    window.location = "/"
    return (ReactDOM.render(<HomePage />, document.getElementById('root')));
}

export default ApplicationStatus;