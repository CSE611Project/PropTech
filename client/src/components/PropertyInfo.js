import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import Navigation from "./Navigation.js";
import HomePage from "./HomePage.js";
import PropManaAfterSign from "./PropManaAfterSign.js";
import AddProperty from "./AddProperty";
import EditProperty from "./EditProperty";
import DeleteProperty from "./DeleteProperty";
import TenantInfo from "./TenantInfo";
import { Component } from "react";
import Button from "@material-ui/core/Button";
import { TableBody } from "@material-ui/core";
import axios from "axios";

class PropertyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: this.props.display,
      property_list: [],
    };
    this.generateTableData();
  }

  getPropertyList() {
    return new Promise((resolve, reject) => {
      axios.get(`/property`).then((response) => {
        this.setState({ property_list: response.data });
        resolve();
      });
    });
  }

  generateTableData = () => {
    this.getPropertyList().then(() => {
      this.res = [];
      for (var i = 0; i < this.state.property_list.length; i++) {
        this.res.push(
          <tr key={i} id={i}>
            <td>{this.state.property_list[i].name}</td>
            <td>{this.state.property_list[i].address}</td>
            <td>{this.state.property_list[i].property_type}</td>
            <td>{this.state.property_list[i].total_footage}</td>
            <td>{this.state.property_list[i].landlord_phone}</td>
            <td>
              <Button
                value={`{"property_id":"${this.state.property_list[i].property_id}", "property_name":"${this.state.property_list[i].name}"}`}
                onClick={(e) => manage_tenants(e.currentTarget.value)}
                color="inherit"
              >
                View Tenants
              </Button>
            </td>
            <td>
              <EditProperty
                property_id={this.state.property_list[i].property_id}
                name={this.state.property_list[i].name}
                address={this.state.property_list[i].address}
                property_type={this.state.property_list[i].property_type}
                total_footage={this.state.property_list[i].total_footage}
                landlord_phone={this.state.property_list[i].landlord_phone}
                info={this}
              />
            </td>
            <td>
              <DeleteProperty property_id={this.state.property_list[i].property_id} info={this} />
            </td>
          </tr>
        );
      }
      this.forceUpdate();
    });
  };

  render() {
    return (
      <div>
        <table className="table">
          <tbody>
            <tr>
              <th style={{ width: "20%" }}>Property Name</th>
              <th style={{ width: "20%" }}>Property Address</th>
              <th style={{ width: "20%" }}>Property Type</th>
              <th style={{ width: "10%" }}>Total Footage</th>
              <th style={{ width: "10%" }}>Landlord Phone</th>
            </tr>
            {this.res}
          </tbody>
        </table>
        <AddProperty className="display_item display" info={this} />
      </div>
    );
  }
}

function manage_tenants(info) {
  var infos = JSON.parse(info);
  sessionStorage.setItem("property_name", infos.property_name);
  sessionStorage.setItem("property_id", infos.property_id);
  window.location = `/PropMana/${sessionStorage.getItem("sub")}/property/${infos.property_id}`;
}

export default PropertyInfo;
