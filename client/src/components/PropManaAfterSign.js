import React from "react";
import { Component } from "react";
import ReactDOM from "react-dom";
import { matchPath } from "react-router-dom";
import "./../App.css";
import Navigation from "./Navigation.js";
import HomePage from "./HomePage.js";
import TenantInfo from "./TenantInfo.js";
import PropertyInfo from "./PropertyInfo.js";
import SideMenu from "./SideMenu.js";
import Cookies from "js-cookie";

class PropManaAfterSign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sub: this.props.match.params.sub,
      page: null,
      page_name: [sessionStorage.getItem("username")],
      pathname: this.props.location.pathname,
    };
  }

  componentDidMount() {
    if (matchPath(this.state.pathname, { path: "/PropMana/:sub/property", exact: true, strict: false })) {
      this.manage_property();
    } else if (matchPath(this.state.pathname, { path: "/PropMana/:sub/property/:propertyId", exact: true, strict: false })) {
      this.manage_tenant(this.props.match.params.propertyId);
    }
  }

  manage_property = () => {
    this.setState({ page: <PropertyInfo display={this} /> });
  };

  manage_tenant = (property_id) => {
    this.setState({ page: <TenantInfo display={this} property_id={property_id} /> });
  };

  render() {
    return (
      <div>
        <header className="Page_Name">
          <h1>{this.state.page_name.join(">")}</h1>
        </header>
        <div className="Info_Page_Split">
          <SideMenu page={this} />
          <div className="display">{this.state.page}</div>
        </div>
      </div>
    );
  }
}

function back() {
  return ReactDOM.render(<PropManaAfterSign />, document.getElementById("root"));
}

export default PropManaAfterSign;
