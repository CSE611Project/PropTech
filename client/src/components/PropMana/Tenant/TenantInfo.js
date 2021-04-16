import React from "react";
import ReactDOM from "react-dom";
import "./../../../App.css";
import EditTenant from "./EditTenant";
import AddTenant from "./AddTenant";
import DeleteTenant from "./DeleteTenant";
import Submeters from "./../Submeter/Submeters";
import Meters from "./../Meter/Meters";
import UtilityBillMeter from "./../../UtilityBillMeter";
import UtilityBillSubmeter from "./../../UtilityBillSubmeter";
import BillingHistory from "./../../BillingHistory";
import CollapseSubmeter from "./../Submeter/CollapseSubmeter";
import { Component } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

class TenantInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenant_list: [],
      meter_list: [],
    };
    this.generateTableData = this.generateTableData.bind(this);
    this.getTenantList = this.getTenantList.bind(this);
    this.getSubmeterList = this.getSubmeterList.bind(this);
    this.generateTableData();
  }

  getTenantList() {
    return new Promise((resolve, reject) => {
      axios.get(`/tenant/${this.props.property_id}/${this.props.sub}`).then((response) => {
        this.setState({ tenant_list: response.data });
        resolve();
      });
    });
  }

  getSubmeterList() {
    return new Promise((resolve, reject) => {
      axios.get(`/submeter/${this.state.tenant_id}/${this.props.sub}`).then((response) => {
        this.setState({ submeter_list: response.data });
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
                sub={this.props.sub}
                tenant_id={this.state.tenant_list[i].tenant_id}
                name={this.state.tenant_list[i].name}
                email={this.state.tenant_list[i].email}
                address={this.state.tenant_list[i].address}
                landlord_phone={this.state.tenant_list[i].landlord_phone}
                rubs={this.state.tenant_list[i].rubs}
                property_id={this.props.property_id}
                generateTableData={this.generateTableData}
              />
            </TableCell>
            <TableCell>
              <DeleteTenant sub={this.props.sub} tenant_id={this.state.tenant_list[i].tenant_id} property_id={this.props.property_id} generateTableData={this.generateTableData} />
            </TableCell>
            <TableCell>
              <Submeters sub={this.props.sub} tenant_id={this.state.tenant_list[i].tenant_id} info={this} property_id={this.props.property_id} />
            </TableCell>
            <CollapseSubmeter tenant_id={this.state.tenant_list[i].tenant_id} property_id={this.props.property_id} info={this} />
          </TableRow>
        );
      }
      this.forceUpdate();
    });
  }

  render() {
    return (
      <div className="main">
        <TableContainer>
          <Table>
            <TableCell component={Paper}>
              <Meters className="display_item" sub={this.props.sub} property_id={this.props.property_id} />
            </TableCell>
            <TableCell component={Paper}>
              <AddTenant
                className="display_item"
                sub={this.props.sub}
                property_id={this.props.property_id}
                total_footage={sessionStorage.getItem("total_footage")}
                generateTableData={this.generateTableData}
              />
            </TableCell>
            <TableCell component={Paper}>
              <Button color="primary" onClick={this.toManageUtilityBillPage}>
                Manage Utility Bill
              </Button>
            </TableCell>
          </Table>
        </TableContainer>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Landlord Phone</TableCell>
                <TableCell>RUBS</TableCell>
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
