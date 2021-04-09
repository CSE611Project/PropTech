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

class EditTenant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      tenant_id: this.props.tenant_id,
      name: this.props.name,
      email: this.props.email,
      address: this.props.address,
      landlord_phone: this.props.landlord_phone,
      rubs: this.props.rubs,
      property_id: this.props.property_id,
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.changeLandlordPhone = this.changeLandlordPhone.bind(this);
    this.changeRubs = this.changeRubs.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidUpdate() {
    if (this.props.tenant_id !== this.state.tenant_id) {
      this.setState({
        tenant_id: this.props.tenant_id,
        name: this.props.name,
        email: this.props.email,
        address: this.props.address,
        landlord_phone: this.props.landlord_phone,
        rubs: this.props.rubs,
        property_id: this.props.property_id,
      });
    }
  }
  updateTenantInfo(tenant_id, tenant_info) {
    axios.patch("/tenant", { tenant_id: tenant_id, tenant_info: tenant_info }).then((response) => {
      this.props.info.generateTableData();
    });
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

  changeName(event) {
    this.setState({
      name: event.target.value,
    });
  }

  changeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  changeAddress(event) {
    this.setState({
      address: event.target.value,
    });
  }

  changeLandlordPhone(event) {
    this.setState({
      landlord_phone: event.target.value,
    });
  }

  changeRubs(event) {
    this.setState({
      rubs: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({
      open: false,
    });
    var tenant_info = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      landlord_phone: this.state.landlord_phone,
      rubs: this.state.rubs,
      property_id: this.state.property_id,
    };
    var tenant_id = this.state.tenant_id;
    this.updateTenantInfo(tenant_id, tenant_info);
  }

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.handleClickOpen}>
          Edit
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Enter Tenant Information</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField autoFocus margin="dense" id="name" label="Name" type="text" value={this.state.name} onChange={this.changeName} fullWidth />
            <TextField autoFocus margin="dense" id="email" label="Email Address" type="email" value={this.state.email} onChange={this.changeEmail} fullWidth />
            <TextField autoFocus margin="dense" id="address" label="Address" type="text" value={this.state.address} onChange={this.changeAddress} fullWidth />
            <TextField autoFocus margin="dense" id="landlord_phone" label="Landlord Phone" type="text" value={this.state.landlord_phone} onChange={this.changeLandlordPhone} fullWidth />
            <TextField autoFocus margin="dense" id="rubs" label="rubs" type="text" value={this.state.rubs} onChange={this.changeRubs} fullWidth />
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
export default EditTenant;
