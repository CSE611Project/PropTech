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
      meter_list: this.props.meter_list
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
      var res = [];
      let tableData = this.state.tenant_list;
      for (var i = 0; i < tableData.length; i++) {
        res.push(
          <tr key={i} id={i}>
            <td>{tableData[i].name}</td>
            <td>{tableData[i].email}</td>
            <td>{tableData[i].address}</td>
            <td>{tableData[i].landlord_phone}</td>
            <td>{tableData[i].rubs}</td>
            <td>
              <EditTenant
                tenant_id={tableData[i].tenant_id}
                name={tableData[i].name}
                email={tableData[i].email}
                address={tableData[i].address}
                landlord_phone={tableData[i].landlord_phone}
                rubs={tableData[i].rubs}
                property_id={this.state.property_id}
                info={this}
              />
            </td>
            <td>
              <DeleteTenant tenant_id={tableData[i].tenant_id} info={this} />
            </td>
            <td><Submeters 
                    tenant_id={tableData[i].tenant_id}
                    name={tableData[i].name}
                    email={tableData[i].email}
                    address={tableData[i].address}
                    rented_area={tableData[i].rented_area}
                    submeter={tableData[i].submeter}
                    property_id={this.state.property_id}
                    info={this}
                /></td>
          </tr>
        );
      }
      this.res = res;
      this.forceUpdate();
    });
  }

  render() {
    return (
      <div>
        <table className="table">
          <tbody>
            <tr>
              <th style={{ width: "25%" }}>Name</th>
              <th style={{ width: "25%" }}>Email</th>
              <th style={{ width: "25%" }}>Address</th>
              <th style={{ width: "10%" }}>Property Share</th>
            </tr>
            {this.res}
          </tbody>
        </table>
        <AddTenant className="display_item" property_id={this.state.property_id} info={this} />
      </div>
    );
  }
}

export default TenantInfo;
