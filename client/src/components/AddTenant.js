import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import TenantInfo from "./TenantInfo.js";
import WhatIsMultiplier from "./WhatIsMultiplier.js";
import WhatIsProRataShare from "./WhatIsProRataShare.js";
import MeterCheckBox from "./MeterCheckbox.js";
import RUBS from "./RUBS.js";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

{
  /* New variables: multiplier, rubs 
    Adjust variables according to database
    Import existing meter to this page, meter and meter_list haven't been declared
*/
}
class AddTenant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: "",
      email: "",
      address: "",
      landlord_phone: "",
      rubs: "",
      property_id: this.props.property_id,
      multiplier: "",
      meter: "",
      meter_list: [],
      total_footage: this.props.total_footage
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.changeLandlordPhone = this.changeLandlordPhone.bind(this);
    this.changeRubs = this.changeRubs.bind(this);
    this.changeMultiplier = this.changeMultiplier.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getAssociatedMeter = this.getAssociatedMeter.bind(this);
  }

  addTenant(tenant_info) {
    axios.post("/tenant", { property_id: this.state.property_id, tenant_info: tenant_info }).then((response) => {
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

  changeRubs(rubs) {
    this.setState({
      rubs: rubs
    });
  }

  changeMultiplier(event) {
    this.setState({
      multiplier: event.target.value,
    });
  }
  onSubmit(event) {
    {
      /* tenant_info update to new requirements */
    }
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
    };
    console.log("add tenant rubs:", this.state.rubs);
    var property_id = this.state.property_id;
    this.addTenant(tenant_info);
  }

  getAssociatedMeter(meters) {
    this.setState({
      meter: meters,
    });
  }

  render() {
    {console.log("add tenant:", this.state.total_footage)}
    return (
      <div>
        <Button color="primary" onClick={this.handleClickOpen}>
          Add Tenant
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Enter Tenant Info</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField autoFocus margin="dense" id="name" label="Name" type="text" onChange={this.changeName} fullWidth />
            <TextField autoFocus margin="dense" id="email" label="Email Address" type="email" onChange={this.changeEmail} fullWidth />
            <TextField autoFocus margin="dense" id="address" label="Address" type="text" onChange={this.changeAddress} fullWidth />
            <TextField autoFocus margin="dense" id="landlord_phone" label="Landlord Phone" type="text" onChange={this.changeLandlordPhone} fullWidth />
            <DialogContent></DialogContent>
            <DialogContent></DialogContent>
            {/* 
                            After import meter_list, assign meter_list to the MeterCheckBox variable
                        */}
            <MeterCheckBox property_id={this.state.property_id} onlyOption={false} methodfromparent={this.getAssociatedMeter} />
            <TextField autoFocus margin="dense" id="multiplier" label="Is there a multiplier?" type="text" onChange={this.changeMultiplier} fullWidth />
            <WhatIsMultiplier />
            <DialogContent></DialogContent>
            <DialogContent></DialogContent>
            <RUBS 
            total_footage={this.state.total_footage}
            methodfromparent={this.changeRubs}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onSubmit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddTenant;
