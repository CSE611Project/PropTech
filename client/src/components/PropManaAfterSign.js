import React from "react";
import { Component } from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import Navigation from "./Navigation.js";
import HomePage from "./HomePage.js";
import TenantInfo from "./TenantInfo.js";
import PropertyInfo from "./PropertyInfo.js";

class PropManaAfterSign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sub: this.props.sub,
      page: null,
      page_name: "",
      page_stack: [],
    };
  }

  componentDidUpdate() {
    if (this.props.sub !== this.state.sub) {
      this.setState({
        sub: this.props.sub,
        page: null,
        page_name: "",
        page_stack: [],
      });
    }
  }

  manage_property = () => {
    this.changeDisplay({ page: <PropertyInfo display={this} />, page_name: "Property Information" });
  };
  changeDisplay = (newState) => {
    this.setState(newState);
  };

  render() {
    return (
      <div>
        <header className="Page_Name">
          <h1>{this.state.page_name}</h1>
        </header>
        <div className="Info_Page_Split">
          <ul className="buttonUL">
            <button className="PropMana_option" onClick={this.manage_property}>
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
          <div className="display">{this.state.page}</div>
        </div>
      </div>
    );
  }
}

function manage_tenant() {
  const ele = (
    <div>
      <TenantInfo />
    </div>
  );
  window.location = "/PropManaAfterSign/TenantInfo";
  return ReactDOM.render(ele, document.getElementById("root"));
}

// function manage_property() {
//   const ele = (
//     <div>
//       <PropertyInfo />
//     </div>
//   );
//   window.location = "/PropManaAfterSign/PropertyInfo";
//   return ReactDOM.render(ele, document.getElementById("root"));
// }

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
  const ele = (
    <div>
      <div className="PropMana_menu" id="logout">
        <header className="RegProcess-header">
          <h1>You have successfully logout</h1>
          <button className="button" onClick={homepage}>
            OK
          </button>
        </header>
      </div>
    </div>
  );
  return ReactDOM.render(ele, document.getElementById("root"));
}

function homepage() {
  window.location = "/";
  return ReactDOM.render(<HomePage />, document.getElementById("root"));
}

function back() {
  return ReactDOM.render(<PropManaAfterSign />, document.getElementById("root"));
}

export default PropManaAfterSign;
