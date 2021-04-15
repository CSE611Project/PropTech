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
import axios from "axios";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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
          <TableRow key={i} id={i}>
            <TableCell>{this.state.property_list[i].name}</TableCell>
            <TableCell>{this.state.property_list[i].address}</TableCell>
            <TableCell>{this.state.property_list[i].property_type}</TableCell>
            <TableCell>{this.state.property_list[i].total_footage}</TableCell>
            <TableCell>{this.state.property_list[i].landlord_phone}</TableCell>
            <TableCell>
              <Button
                value={`{"property_id":"${this.state.property_list[i].property_id}",
                 "property_name":"${this.state.property_list[i].name}",
                  "total_footage":"${this.state.property_list[i].total_footage}"}`}
                onClick={(e) => manage_tenants(e.currentTarget.value)}
                color="primary"
              >
                View Details
              </Button>
            </TableCell>
            <TableCell>
              <EditProperty
                property_id={this.state.property_list[i].property_id}
                name={this.state.property_list[i].name}
                address={this.state.property_list[i].address}
                property_type={this.state.property_list[i].property_type}
                total_footage={this.state.property_list[i].total_footage}
                landlord_phone={this.state.property_list[i].landlord_phone}
                info={this}
              />
            </TableCell>
            <TableCell>
              <DeleteProperty property_id={this.state.property_list[i].property_id} info={this} />
            </TableCell>
          </TableRow>
        );
      }
      this.forceUpdate();
    });
  };

  render() {
    return (
      <div className="main">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Property Name</TableCell>
                <TableCell>Property Address</TableCell>
                <TableCell>Property Type</TableCell>
                <TableCell>Total Footage</TableCell>
                <TableCell>Landlord Phone</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <AddProperty className="display_item" info={this} />
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

function manage_tenants(info) {
  var infos = JSON.parse(info);
  sessionStorage.setItem("property_name", infos.property_name);
  sessionStorage.setItem("property_id", infos.property_id);
  sessionStorage.setItem("total_footage", infos.total_footage);
  window.location = `/PropMana/${sessionStorage.getItem("sub")}/property/${infos.property_id}`;
}

export default PropertyInfo;