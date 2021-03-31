import React from "react";
import { Component } from "react";
import ReactDOM from "react-dom";
import PropManaAfterSign from "./PropManaAfterSign.js";
import "./../App.css";

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ul className="buttonUL">
          <button className="PropMana_option" onClick={manage_property}>
            Manage Property Info
          </button>
          <button className="PropMana_option" onClick={edit_profile}>
            Edit Profile Info
          </button>
          <button className="PropMana_option" onClick={manage_utility}>
            Manage Utility Bill
          </button>
          <button className="PropMana_option" onClick={manage_invoice}>
            Manage Invoice History
          </button>
          <button className="PropMana_option" onClick={generate_invoice}>
            Generate Invoice
          </button>
          <button className="PropMana_option" onClick={log_out}>
            Log Out
          </button>
        </ul>
      </div>
    );
  }
}

function manage_property() {
  window.location = `/PropMana/${sessionStorage.getItem("sub")}/property`;
}

function edit_profile() {
  const ele = <div></div>;
  return ReactDOM.render(ele, document.getElementById("root"));
}

function manage_utility() {
  const ele = <div></div>;
  return ReactDOM.render(ele, document.getElementById("root"));
}

function manage_invoice() {
  const ele = <div></div>;
  return ReactDOM.render(ele, document.getElementById("root"));
}

function generate_invoice() {
  const ele = <div></div>;
  return ReactDOM.render(ele, document.getElementById("root"));
}

function log_out() {
  //   const ele = (
  //     <div>
  //       <div className="PropMana_menu" id="logout">
  //         <header className="RegProcess-header">
  //           <h1>You have successfully logout</h1>
  //           <button className="button" onClick={homepage}>
  //             OK
  //           </button>
  //         </header>
  //       </div>
  //     </div>
  //   );
  //   return ReactDOM.render(ele, document.getElementById("root"));
}

function homepage() {
  //   window.location = "/";
  //   return ReactDOM.render(<HomePage />, document.getElementById("root"));
}

export default SideMenu;
