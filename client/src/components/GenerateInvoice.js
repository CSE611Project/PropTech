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
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DatePicker from "./DatePicker.js";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
class GenerateInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      property_id: this.props.property_id,
      begin: "",
      end: "",
      open: false,
    };
    this.generateTableData();
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleClickOpen() {
    this.setState({
      open: true,
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  onSubmit(event) {
    //* not sure about what kind of information should be transmitted.
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
            <TableCell>{this.state.property_id}</TableCell>
            <TableCell>{this.state.tenant_list[i].name}</TableCell>
            <TableCell>{this.state.tenant_list[i].email}</TableCell>
            <TableCell>{this.state.tenant_list[i].address}</TableCell>
            <TableCell>{this.state.tenant_list[i].landlord_phone}</TableCell>
          </TableRow>
        );
      }
      this.forceUpdate();
    });
  }

  render() {
    return (
      <div>
        <a href="#" onClick={this.handleClickOpen}>
          Generate Invoice
        </a>
        <div className="main">
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Generating Invoice Statement</DialogTitle>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Property ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Landlord Phone</TableCell>
                  <TableCell>
                    <DatePicker />
                  </TableCell>

                  <TableCell>
                    <Button onClick={this.onSubmit} color="primary">
                      Generate
                    </Button>
                  </TableCell>

                  <TableCell>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{this.res}</TableBody>
            </Table>
          </Dialog>{" "}
        </div>
      </div>
    );
  }
}
export default GenerateInvoice;
