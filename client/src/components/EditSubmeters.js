import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import TenantInfo from "./TenantInfo.js";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

class EditSubmeters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: this.props.name,
      tenant_id: this.props.tenant_id,
      email: this.props.email,
      address: this.props.address,
      phone_number: this.props.phone_number,
      submeter_list: [],
      submeter: this.props.submeter,
      property_id: this.props.property_id,
      submeter_id: this.props.submeter_id,
      meter_id: this.props.meter_id,
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.changeSubmeter = this.changeSubmeter.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidUpdate() {
    if (this.props.submeter_id !== this.state.submeter_id) {
      this.setState({
        name: this.props.name,
        name: this.props.name,
        tenant_id: this.props.tenant_id,
        email: this.props.email,
        address: this.props.address,
        phone_number: this.props.phone_number,
        submeter_list: [],
        submeter: this.props.submeter,
        property_id: this.props.property_id,
        submeter_id: this.props.submeter_id,
        meter_id: this.props.meter_id,
      });
    }
  }
  updateSubmeter(tenant_id, submeter) {
    {
      //TODO
      /*axios.patch('/tenant', {tenant_id: tenant_id, tenant_info: tenant_info}).then(response => {
            this.props.info.generateTableData();
        })*/
    }
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

  changeSubmeter(event) {
    this.setState({
      submeter: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({
      open: false,
    });
    var tenant_id = this.state.tenant_id;
    this.updateSubmeter(tenant_id, this.state.submeter);
    console.log(this.state.submeter);
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClickOpen} color="primary">
          Edit
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Enter Submeter</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField autoFocus margin="dense" id="submeter" label="Submeter" type="text" value={this.state.submeter} onChange={this.changeSubmeter} fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onSubmit} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default EditSubmeters;
