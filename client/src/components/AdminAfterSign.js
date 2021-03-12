import React from "react";
import ReactDOM from 'react-dom';
import "./../App.css";


class AdminAfterSign extends React.Component{

    render(){
        return(
        
            <div>
              <nav>
               <ul>
                <li>
                    <a href="/index">Home</a>
                </li>
               </ul>
              </nav>

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
        <nav>
            <ul>
            <li>
                <a href="/index">Home</a>
            </li>
            </ul>
        </nav>        
    </div>
    return (ReactDOM.render(ele, document.getElementById('root')));
}

function view_managers (){
    const ele = 
    <div>
        <nav>
            <ul>
            <li>
                <a href="/index">Home</a>
            </li>
            </ul>
        </nav>        
    </div>
    return (ReactDOM.render(ele, document.getElementById('root')));
}

function view_account_application(){
    const ele = 
    <div>
        <nav>
            <ul>
            <li>
                <a href="/index">Home</a>
            </li>
            </ul>
        </nav>        
    </div>
    return (ReactDOM.render(ele, document.getElementById('root')));    
}

function log_out(){
    const ele = 
    <div>
        <nav>
            <ul>
            <li>
                <a href="/index">Home</a>
            </li>
            </ul>
        </nav>
        <div className = "Admin_menu" id = "logout">
        <header className = "Admin_menu">
            <h1>You have successfully logout</h1>  
        </header>
        </div>        
    </div>
    return (ReactDOM.render(ele, document.getElementById('root')));     
}



export default AdminAfterSign;