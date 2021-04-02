import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import Navigation from "./Navigation.js";
import HomePage from "./HomePage.js";
import PropManaAfterSign from "./PropManaAfterSign.js";
import PropertyInfo from "./PropertyInfo.js";
import EditTenant from "./EditTenant";
import AddTenant from "./AddTenant";
import DeleteTenant from "./DeleteTenant";
import Submeters from "./Submeters";
import Meters from "./Meters";
import { Component } from "react";
import { TableBody } from "@material-ui/core";
import axios from "axios";

class TenantInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: this.props.display,
      property_id: sessionStorage.getItem("property_id"),
      property_name: sessionStorage.getItem("property_name"),
      tenant_list: [],
      meter_list: this.props.meter_list,
    };
    this.generateTableData();
  }

  getTenantList() {
    return new Promise((resolve, reject) => {
      axios.get(`/tenant/${this.state.property_id}`).then((response) => {
        this.setState({ tenant_list: response.data });
        resolve();
      });
    });
  }

  generateTableData() {
    this.getTenantList().then(() => {
      this.res = [];
      for (var i = 0; i < this.state.tenant_list.length; i++) {
        this.res.push(
          <tr key={i} id={i}>
            <td>{this.state.tenant_list[i].name}</td>
            <td>{this.state.tenant_list[i].email}</td>
            <td>{this.state.tenant_list[i].address}</td>
            <td>{this.state.tenant_list[i].landlord_phone}</td>
            <td>{this.state.tenant_list[i].rubs}</td>
            <td>
              <EditTenant
                tenant_id={this.state.tenant_list[i].tenant_id}
                name={this.state.tenant_list[i].name}
                email={this.state.tenant_list[i].email}
                address={this.state.tenant_list[i].address}
                landlord_phone={this.state.tenant_list[i].landlord_phone}
                rubs={this.state.tenant_list[i].rubs}
                property_id={this.state.property_id}
                info={this}
              />
            </td>
            <td>
              <DeleteTenant tenant_id={this.state.tenant_list[i].tenant_id} info={this} />
            </td>
            <td>
              <Submeters
                tenant_id={this.state.tenant_list[i].tenant_id}
                name={this.state.tenant_list[i].name}
                email={this.state.tenant_list[i].email}
                address={this.state.tenant_list[i].address}
                rented_area={this.state.tenant_list[i].rented_area}
                submeter={this.state.tenant_list[i].submeter}
                property_id={this.state.property_id}
                info={this}
              />
            </td>
          </tr>
        );
      }
      this.forceUpdate();
    });
  }

  render() {
    return (
      <div className="main">
        <h1 className="AdminAfterSign">Tenant Information</h1>
        <table className="display_item" >
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Property Share</th>
              <th><AddTenant className="display_item" property_id={this.state.property_id} info={this} /></th>
              <th><Meters className="display_item" /></th>
            </tr>
            {this.res}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TenantInfo;