import React from "react";
import "./../../../App.css";
import WhatIsProRataShare from "./../../WhatIsProRataShare.js";
import MeterCheckBox from "./../../MeterCheckbox";
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
import NumberFormat from 'react-number-format';

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
      multiplier: "",
      meter: "",
      meter_list: [],
      yes: false,
      no: false,
      tenantFt: "",
      nameError: "",
      addressError: "",
      emailError: "",
      phoneError: "",
      name_errors: false,
      address_errors: false,
      email_errors: false,
      phone_errors: false,
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
    this.changeMeter_List = this.changeMeter_List.bind(this);
    this.validation = this.validation.bind(this);
  }

  addTenant(tenant_info) {
    axios.post("/tenant", { sub: this.props.sub, property_id: this.props.property_id, tenant_info: tenant_info, meter_list: this.state.meter_list }).then((response) => {
      this.props.generateTableData();
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
      name: "",
      address: "",
      email: "",
      landlord_phone: "",
      nameError: "",
      addressError: "",
      emailError: "",
      phoneError: "",
      name_errors: false,
      address_errors: false,
      email_errors: false,
      phone_errors: false,
    });
  }

  changeName(event) {
    this.setState({
      name: event.target.value,
      nameError: "",
      name_errors: false
    });
  }
  changeMeter_List(meter_list) {
    this.setState({
      meter_list: meter_list,
    });
  }
  changeEmail(event) {
    this.setState({
      email: event.target.value,
      emailError: "",
      email_errors: false
    });
  }

  changeAddress(event) {
    this.setState({
      address: event.target.value,
      addressError: "",
      address_errors: false
    });
  }

  changeLandlordPhone(event) {
    this.setState({
      landlord_phone: event.target.value,
      phoneError: "",
      phone_errors: false
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
    if (this.validation()) {
      var tenant_info = {
        name: this.state.name,
        email: this.state.email,
        address: this.state.address,
        landlord_phone: this.state.landlord_phone,
        rubs: this.state.rubs,
      };
      this.addTenant(tenant_info);
      this.setState({
        meter_list: [],
        open: false,
        name: "",
        address: "",
        email: "",
        landlord_phone: "",
        nameError: "",
        addressError: "",
        emailError: "",
        phoneError: "",
        name_errors: false,
        address_errors: false,
        email_errors: false,
        phone_errors: false,
      });
    }
    // this.forceUpdate();
  }

  getAssociatedMeter(meter_list) {
    this.setState((prevState) => ({
      meter_list: [meter_list, ...prevState.meter_list],
    }));
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
    var totalBuildingFt = this.props.total_footage;
    var tenantft = this.state.tenantFt;
    if (tenantft != "") {
      var rubs = tenantft / totalBuildingFt;
      this.setState({
        rubs: rubs,
      });

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

  validation() {
    var isValidate = true;
    var email_pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    var name_pattern = new RegExp(/^[a-z ,.'-]+$/i);
    if (this.state.name === "" || !name_pattern.test(this.state.name)) {
      var nameMessage = "Please enter a valid name"
      this.setState({
        nameError: nameMessage,
        name_errors: true
      })
      isValidate = false;
    }
    if (this.state.email === "" ) {
      var emailMessage = "Please enter a valid email address"
      this.setState({
        emailError: emailMessage,
        email_errors: true
      })
      isValidate = false;
    }
    if (!email_pattern.test(this.state.email)) {
      var emailMessage = "Please enter a valid email address"
      this.setState({
        emailError: emailMessage,
        email_errors: true
      })
      isValidate = false;
    }
    if (this.state.address === "") {
      var addressMessage = "Please enter a valid address"
      this.setState({
        addressError: addressMessage,
        address_errors: true
      })
      isValidate = false;
    }
    var phone_pattern = new RegExp(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/);
    if (this.state.landlord_phone === "" || !phone_pattern.test(this.state.landlord_phone)) {
      var phoneMessage = "Please enter a valid phone number"
      this.setState({
        phoneError: phoneMessage,
        phone_errors: true
      })
      isValidate = false;
    }
    return isValidate;
  }

  render() {
    const isYes = this.state.yes;
    const isNo = this.state.no;
    var is_validate_name = this.state.name_errors;
    var is_validate_address = this.state.address_errors;
    var is_validate_email = this.state.email_errors;
    var is_validate_phone = this.state.phone_errors;
    var name_message = this.state.nameError;
    var address_message = this.state.addressError;
    var email_message = this.state.emailError;
    var phone_message = this.state.phoneError;
    return (
      <div>
        <Button color="primary" onClick={this.handleClickOpen}>
          Add Tenant
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Enter Tenant Info</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              onChange={this.changeName}
              helperText={is_validate_name ? name_message : null}
              error={this.state.name_errors}
              fullWidth
              required
            />
            <TextField 
              autoFocus 
              margin="dense" 
              id="email" 
              label="Email Address" 
              type="email" 
              onChange={this.changeEmail} 
              helperText={is_validate_email ? email_message : null}
              error={this.state.email_errors}
              fullWidth 
              required
            />
            <TextField 
              autoFocus 
              margin="dense" 
              id="address" 
              label="Address" 
              type="text" 
              onChange={this.changeAddress} 
              helperText={is_validate_address ? address_message : null}
              error={this.state.address_errors}
              fullWidth 
              required
            />
            <NumberFormat 
              customInput={TextField} 
              autoFocus 
              margin="dense"
              id="landlord_phone" 
              label="Landlord Phone" 
              type="text" 
              onChange={this.changeLandlordPhone} 
              helperText={is_validate_phone ? phone_message : null}
              error={this.state.phone_errors}
              fullWidth 
              format="(###) ###-####" 
              required
            />
            {/* 
                            After import meter_list, assign meter_list to the MeterCheckBox variable
                        */}
            <DialogContent />
            <MeterCheckBox property_id={this.props.property_id} onlyOption={false} methodfromparent={this.getAssociatedMeter} />
            {/* <TextField autoFocus margin="dense" id="multiplier" label="Is there a multiplier?" type="text" onChange={this.changeMultiplier} fullWidth />
            <WhatIsMultiplier /> */}
            <DialogContent></DialogContent>
            <FormControl>
              <FormLabel>
                Is this Tenant Billed based off a Percentage (Pro-Rata) Share of Building?
                <DialogContentText />
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
                    <NumberFormat
                      customInput={TextField}
                      autoFocus
                      margin="dense"
                      id="rubs"
                      label="Enter Percentage Share of Building"
                      type="text"
                      fullWidth
                      onChange={this.changeRUBS}
                      suffix="%"
                    />
                  </div>
                ) : null}
                {isNo ? (
                  <div>
                    <div>Total buildings square footage: {this.props.total_footage}</div>
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
