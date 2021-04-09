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
import axios from "axios";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class TenantInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: this.props.display,
      property_id: sessionStorage.getItem("property_id"),
      property_name: sessionStorage.getItem("property_name"),
      total_footage: sessionStorage.getItem("total_footage"),
      tenant_list: [],
      meter_list: [],
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
          <TableRow key={i} id={i}>
            <TableCell>{this.state.tenant_list[i].name}</TableCell>
            <TableCell>{this.state.tenant_list[i].email}</TableCell>
            <TableCell>{this.state.tenant_list[i].address}</TableCell>
            <TableCell>{this.state.tenant_list[i].landlord_phone}</TableCell>
            <TableCell>{this.state.tenant_list[i].rubs}</TableCell>
            <TableCell>
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
            </TableCell>
            <TableCell>
              <DeleteTenant tenant_id={this.state.tenant_list[i].tenant_id} info={this} />
            </TableCell>
            <TableCell>
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
            </TableCell>
          </TableRow>
        );
      }
      this.forceUpdate();
    });
  }

  render() {
    return (
      <div className="main">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Landlord Phone</TableCell>
                <TableCell>RUBS</TableCell>
                <TableCell />
                <TableCell>
                  <Meters className="display_item" property_id={this.state.property_id} info={this} />
                </TableCell>
                <TableCell>
                  <AddTenant className="display_item" property_id={this.state.property_id} total_footage={this.state.total_footage} info={this} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{this.res}</TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default TenantInfo;
