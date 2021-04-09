import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./../App.css";
import TenantInfo from "./TenantInfo.js";
import WhatIsMultiplier from "./WhatIsMultiplier.js";
import WhatIsProRataShare from "./WhatIsProRataShare.js";
import MeterCheckBox from "./MeterCheckbox.js";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";

import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
      total_footage: this.props.total_footage,

      rubs: "",
      yes: false,
      no: false,
      tenantFt: "",
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.changeLandlordPhone = this.changeLandlordPhone.bind(this);
    this.changeMultiplier = this.changeMultiplier.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getAssociatedMeter = this.getAssociatedMeter.bind(this);

    this.onChangeYes = this.onChangeYes.bind(this);
    this.onChangeNo = this.onChangeNo.bind(this);
    this.changeRUBS = this.changeRUBS.bind(this);
    this.changeTenantFt = this.changeTenantFt.bind(this);
    this.calculate = this.calculate.bind(this);
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
    this.addTenant(tenant_info);
  }

  getAssociatedMeter(key, value) {
    this.setState({});
  }

  changeRUBS(event) {
    event.preventDefault();
    this.setState({
      // meter: meters,
    });
  }

  changeRUBS(event) {
    event.preventDefault();
    this.setState({
      rubs: event.target.value,
    });
  }

  changeTenantFt(event) {
    event.preventDefault();
    this.setState({
      tenantFt: event.target.value,
    });
  }

  calculate(event) {
    {
      var totalBuildingFt = this.state.total_footage;
      var tenantft = this.state.tenantFt;
      console.log(this.state.total_footage);
      console.log(this.state.tenantFt);
      if (tenantft != "") {
        var rubs = tenantft / totalBuildingFt;
        this.setState({
          rubs: rubs,
        });
      }
      /* should specify a way to calculate rubs based on tenantFt and then save into rubs variable*/
      console.log(tenantft / totalBuildingFt);
    }
    event.preventDefault();
  }

  onChangeYes(event) {
    event.preventDefault();
    this.setState({
      yes: event.target.checked,
      no: false,
    });
  }

  onChangeNo(event) {
    event.preventDefault();
    this.setState({
      no: event.target.checked,
      yes: false,
    });
  }

  render() {
    {
      console.log("add tenant:", this.state.total_footage);
    }
    const isYes = this.state.yes;
    const isNo = this.state.no;
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
            {/* 
                            After import meter_list, assign meter_list to the MeterCheckBox variable
                        */}
            <MeterCheckBox property_id={this.state.property_id} onlyOption={false} methodfromparent={this.getAssociatedMeter} />
            <TextField autoFocus margin="dense" id="multiplier" label="Is there a multiplier?" type="text" onChange={this.changeMultiplier} fullWidth />
            <WhatIsMultiplier />
            <DialogContent></DialogContent>
            <DialogContent></DialogContent>
            <FormControl>
              <FormLabel>
                Is there a RUBS?
                <WhatIsProRataShare />
              </FormLabel>
              <FormGroup row>
                <FormControlLabel control={<Checkbox checked={this.state.yes} onChange={this.onChangeYes} name="yes" color="primary" />} label="yes" />
                <FormControlLabel control={<Checkbox checked={this.state.no} onChange={this.onChangeNo} name="no" color="primary" />} label="no" />
              </FormGroup>
              <DialogContent></DialogContent>
              <div>
                {isYes ? (
                  <div>
                    <TextField autoFocus margin="dense" id="rubs" label="Enter RUBS" type="text" onChange={this.changeRUBS} fullWidth />
                  </div>
                ) : null}
                {isNo ? (
                  <div>
                    <div>Total buildings square footage: {this.state.total_footage}</div>
                    <TextField autoFocus margin="dense" id="tenantFt" label="Enter tenant square footage" type="text" onChange={this.changeTenantFt} fullWidth />
                    <Button onClick={this.calculate} color="primary">
                      Calculate
                    </Button>
                  </div>
                ) : null}
              </div>
            </FormControl>
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
